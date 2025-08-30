<?php
// Enable CORS
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
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
    die(json_encode([
        "status" => "error",
        "message" => "Database connection failed"
    ]));
}

// GET - Retrieve all stores
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // Query to get all stores
        $sql = "SELECT * FROM stores";
        $result = $conn->query($sql);
        
        // Check if any stores exist
        if ($result->num_rows > 0) {
            $stores = [];
            
            // Fetch all rows
            while($row = $result->fetch_assoc()) {
                $stores[] = $row;
            }
            
            // Return success response
            echo json_encode([
                "status" => "success",
                "data" => $stores
            ]);
        } else {
            // Return empty array if no stores
            echo json_encode([
                "status" => "success",
                "data" => []
            ]);
        }
    } catch (Exception $e) {
        // Handle any errors
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "Failed to fetch stores",
            "error" => $e->getMessage()
        ]);
    }
} else {
    // Handle invalid methods
    http_response_code(405);
    echo json_encode([
        "status" => "error",
        "message" => "Method not allowed"
    ]);
}

// Close connection
$conn->close();
?>