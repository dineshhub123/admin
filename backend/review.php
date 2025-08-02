<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "ruralxadmin";

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(["error" => "Connection failed: " . $e->getMessage()]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['product_id'])) {
            $product_id = $_GET['product_id'];
            $stmt = $conn->prepare("SELECT * FROM reviews WHERE product_id = :product_id");
            $stmt->bindParam(':product_id', $product_id);
            $stmt->execute();
            $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($reviews);
        } else {
            echo json_encode(["error" => "Product ID is required"]);
        }
        break;
        
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        
        if (!empty($data['product_id']) && !empty($data['customer_name']) && !empty($data['rating'])) {
            $stmt = $conn->prepare("INSERT INTO reviews (product_id, customer_name, rating, review_text) 
                                  VALUES (:product_id, :customer_name, :rating, :review_text)");
            
            $stmt->bindParam(':product_id', $data['product_id']);
            $stmt->bindParam(':customer_name', $data['customer_name']);
            $stmt->bindParam(':rating', $data['rating']);
            $stmt->bindParam(':review_text', $data['review_text']);
            
            if ($stmt->execute()) {
                echo json_encode(["message" => "Review added successfully"]);
            } else {
                echo json_encode(["error" => "Failed to add review"]);
            }
        } else {
            echo json_encode(["error" => "Required fields are missing"]);
        }
        break;
        
    default:
        echo json_encode(["error" => "Method not supported"]);
        break;
}
?>