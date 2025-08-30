<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ruralxadmin";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(503);
    echo json_encode(["error" => "Database connection failed"]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id)) {
    http_response_code(400);
    echo json_encode(["error" => "Order ID is required"]);
    exit();
}

$id = $conn->real_escape_string($data->id);
$updates = [];

$fields = [
    'product_name', 'product_mrp_price', 'product_price', 'product_discount',
    'quantity', 'category', 'delivery_date', 'user_first_name', 'user_last_name',
    'user_phone', 'user_email', 'user_address', 'user_pincode'
];

foreach ($fields as $field) {
    if (isset($data->$field)) {
        $updates[] = "$field = '" . $conn->real_escape_string($data->$field) . "'";
    }
}

if (empty($updates)) {
    http_response_code(400);
    echo json_encode(["error" => "No fields provided for update"]);
    exit();
}

$sql = "UPDATE orders SET " . implode(', ', $updates) . " WHERE id = '$id'";

if ($conn->query($sql)) {
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "Order updated"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "Update failed: " . $conn->error]);
}

$conn->close();
?>