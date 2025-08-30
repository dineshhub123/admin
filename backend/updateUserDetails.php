<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

// Validate input
if (!$data || !isset($data->id)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Invalid input data"]);
    exit();
}

$conn = new mysqli("localhost", "root", "", "ruralxadmin");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database connection failed"]);
    exit();
}

$stmt = $conn->prepare("UPDATE userDetails_data SET 
    user_first_name = ?,
    user_last_name = ?,
    user_email = ?,
    user_phone = ?,
    user_address = ?,
    user_pincode = ?
    WHERE id = ?");

$stmt->bind_param("ssssssi", 
    $data->u_firstname,
    $data->u_lastname,
    $data->u_email,
    $data->u_phone,
    $data->u_address,
    $data->u_pincode,
    $data->id);

if ($stmt->execute()) {
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Customer updated"]);
} else {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Update failed: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>