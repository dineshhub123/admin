<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ruralxadmin";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(503); // Service Unavailable
    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed",
        "error" => $conn->connect_error
    ]);
    exit();
}

// SQL query to fetch categories
$sql = "SELECT 
            id, 
            name as category_name,
            description,
            created_at,
            updated_at,
            status
        FROM categories 
        WHERE status = 1
        ORDER BY name ASC";

$result = $conn->query($sql);

if ($result === false) {
    http_response_code(500); // Internal Server Error
    echo json_encode([
        "status" => "error",
        "message" => "Database query failed",
        "error" => $conn->error
    ]);
    $conn->close();
    exit();
}

$categories = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        // Sanitize and format each category
        $category = array(
            "id" => (int)$row['id'],
            "name" => htmlspecialchars($row['category_name']),
            "description" => htmlspecialchars($row['description']),
            "created_at" => $row['created_at'],
            "updated_at" => $row['updated_at'],
            "status" => (bool)$row['status']
        );
        array_push($categories, $category);
    }
    
    http_response_code(200); // OK
    echo json_encode([
        "status" => "success",
        "data" => $categories,
        "count" => count($categories)
    ]);
} else {
    http_response_code(404); // Not Found
    echo json_encode([
        "status" => "success",
        "data" => [],
        "message" => "No categories found",
        "count" => 0
    ]);
}

$conn->close();
?>