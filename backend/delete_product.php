<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "ruralxadmin";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed"]));
}

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$productId = isset($request->id) ? intval($request->id) : null;

if ($productId) {
    $sql = "DELETE FROM product_data WHERE id = $productId";
    if ($conn->query($sql)) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Query failed: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid ID"]);
}
?>
