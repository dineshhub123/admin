<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database configuration
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ruralxadmin";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["status" => "error", "message" => "Database connection failed"]));
}

// Get the HTTP method
$method = $_SERVER['REQUEST_METHOD'];

// Process the request
switch ($method) {
    case 'GET':
        // READ operation
        if (isset($_GET['id'])) {
            // Get single store
            $id = (int)$_GET['id'];
            $stmt = $conn->prepare("SELECT * FROM stores WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows > 0) {
                echo json_encode(["status" => "success", "data" => $result->fetch_assoc()]);
            } else {
                http_response_code(404);
                echo json_encode(["status" => "error", "message" => "Store not found"]);
            }
        } else {
            // Get all stores
            $result = $conn->query("SELECT * FROM stores");
            $stores = [];
            
            while($row = $result->fetch_assoc()) {
                $stores[] = $row;
            }
            
            echo json_encode(["status" => "success", "data" => $stores]);
        }
        break;
        
    case 'POST':
        // CREATE operation
        $data = json_decode(file_get_contents("php://input"), true);
        
        // Validate required fields
        if (empty($data['name']) || empty($data['address'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Name and address are required"]);
            break;
        }
        
        // Handle optional fields
        $phone = isset($data['phone']) ? $data['phone'] : null;
        $email = isset($data['email']) ? $data['email'] : null;
        
        // Prepare and execute statement
        $stmt = $conn->prepare("INSERT INTO stores (name, address, phone, email) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $data['name'], $data['address'], $phone, $email);
        
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode([
                "status" => "success",
                "id" => $conn->insert_id,
                "message" => "Store created successfully"
            ]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Error creating store: " . $conn->error]);
        }
        break;
        
    case 'PUT':
        // UPDATE operation
        $data = json_decode(file_get_contents("php://input"), true);
        
        // Validate required fields
        if (empty($data['id']) || empty($data['name']) || empty($data['address'])) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "ID, name and address are required"]);
            break;
        }
        
        // Handle optional fields
        $phone = isset($data['phone']) ? $data['phone'] : null;
        $email = isset($data['email']) ? $data['email'] : null;
        
        // Prepare and execute statement
        $stmt = $conn->prepare("UPDATE stores SET name = ?, address = ?, phone = ?, email = ? WHERE id = ?");
        $stmt->bind_param("ssssi", $data['name'], $data['address'], $phone, $email, $data['id']);
        
        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                echo json_encode(["status" => "success", "message" => "Store updated successfully"]);
            } else {
                http_response_code(404);
                echo json_encode(["status" => "error", "message" => "Store not found or no changes made"]);
            }
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Error updating store: " . $conn->error]);
        }
        break;
        
    case 'DELETE':
        // DELETE operation
        $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
        
        if ($id <= 0) {
            http_response_code(400);
            echo json_encode(["status" => "error", "message" => "Invalid store ID"]);
            break;
        }
        
        $stmt = $conn->prepare("DELETE FROM stores WHERE id = ?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                echo json_encode(["status" => "success", "message" => "Store deleted successfully"]);
            } else {
                http_response_code(404);
                echo json_encode(["status" => "error", "message" => "Store not found"]);
            }
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Error deleting store: " . $conn->error]);
        }
        break;
        
    default:
        http_response_code(405);
        echo json_encode(["status" => "error", "message" => "Method not allowed"]);
        break;
}

// Close connection
$conn->close();
?>