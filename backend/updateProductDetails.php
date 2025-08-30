<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: PUT, POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ruralxadmin";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $conn->connect_error]);
    exit();
}

// Handle both PUT and POST requests
if ($_SERVER['REQUEST_METHOD'] === 'PUT' || $_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get input data
    $input = json_decode(file_get_contents("php://input"), true);
    
    // If no JSON input, try form data
    if (empty($input)) {
        $input = $_POST;
    }

    // Validate required fields
    if (!isset($input['id'])) {
        http_response_code(400);
        echo json_encode(["error" => "Product ID is required"]);
        exit();
    }

    $id = $conn->real_escape_string($input['id']);
    $name = isset($input['p_name']) ? $conn->real_escape_string($input['p_name']) : null;
    $price = isset($input['p_price']) ? $conn->real_escape_string($input['p_price']) : null;
    $mrp = isset($input['p_mrp']) ? $conn->real_escape_string($input['p_mrp']) : null;
    $discount = isset($input['p_discount']) ? $conn->real_escape_string($input['p_discount']) : null;
    $deliveryDate = isset($input['delivery_date']) ? $conn->real_escape_string($input['delivery_date']) : null;
    $category = isset($input['p_category']) ? $conn->real_escape_string($input['p_category']) : null;
    $description = isset($input['p_description']) ? $conn->real_escape_string($input['p_description']) : null;
    $color = isset($input['p_color']) ? $conn->real_escape_string($input['p_color']) : null;
    $size = isset($input['p_size']) ? $conn->real_escape_string($input['p_size']) : null;

    // Initialize image paths
    $imagePaths = [
        'front' => null,
        'back' => null,
        'side' => null,
        'top' => null,
        'triangle' => null
    ];

    // Handle file uploads if present
    if (!empty($_FILES)) {
        $upload_dir = '../src/assets/uploads/';
        
        // Process each possible image upload
        $imageTypes = ['front', 'back', 'side', 'top', 'triangle'];
        foreach ($imageTypes as $type) {
            $fileKey = 'image_' . $type;
            if (isset($_FILES[$fileKey]) {
                $file = $_FILES[$fileKey];
                if ($file['error'] === UPLOAD_ERR_OK) {
                    $filename = uniqid() . '_' . basename($file['name']);
                    $target_path = $upload_dir . $filename;
                    if (move_uploaded_file($file['tmp_name'], $target_path)) {
                        $imagePaths[$type] = $target_path;
                    }
                }
            }
        }
    }

    // Build the SQL update query
    $updates = [];
    if ($name) $updates[] = "product_name = '$name'";
    if ($price) $updates[] = "product_price = '$price'";
    if ($mrp) $updates[] = "product_mrp_price = '$mrp'";
    if ($discount) $updates[] = "product_discount = '$discount'";
    if ($deliveryDate) $updates[] = "delivery_date = '$deliveryDate'";
    if ($category) $updates[] = "category = '$category'";
    if ($description) $updates[] = "product_description = '$description'";
    if ($color) $updates[] = "product_color = '$color'";
    if ($size) $updates[] = "product_size = '$size'";
    
    // Add image updates
    foreach ($imagePaths as $type => $path) {
        if ($path) {
            $column = 'img_' . $type;
            $updates[] = "$column = '$path'";
        }
    }

    if (empty($updates)) {
        http_response_code(400);
        echo json_encode(["error" => "No fields provided for update"]);
        exit();
    }

    $sql = "UPDATE product_data SET " . implode(', ', $updates) . " WHERE id = '$id'";

    if ($conn->query($sql)) {
        if ($conn->affected_rows > 0) {
            echo json_encode(["success" => true, "message" => "Product updated successfully"]);
        } else {
            echo json_encode(["success" => true, "message" => "No changes made to product"]);
        }
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Update failed: " . $conn->error]);
    }
} else {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
}

$conn->close();
?>