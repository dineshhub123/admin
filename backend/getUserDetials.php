<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "ruralaxadmin";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

// Determine if we're getting a specific user or all users
$userId = isset($_GET['id']) ? intval($_GET['id']) : null;

if ($userId) {
    // Get single user by ID
    $sql = "SELECT * FROM userDetails_data WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        // Remove password before sending response
        unset($user['user_password']);
        echo json_encode($user);
    } else {
        http_response_code(404);
        echo json_encode(["message" => "User not found"]);
    }
    $stmt->close();
} else {
    // Get all users with pagination
    $page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
    $limit = isset($_GET['limit']) ? max(1, intval($_GET['limit'])) : 10;
    $offset = ($page - 1) * $limit;
    
    // Get total count for pagination
    $countSql = "SELECT COUNT(*) as total FROM userDetails_data";
    $countResult = $conn->query($countSql);
    $totalRows = $countResult->fetch_assoc()['total'];
    $totalPages = ceil($totalRows / $limit);
    
    // Get paginated users
    $sql = "SELECT user_id, user_first_name, user_last_name, user_email, user_phone, user_address, user_pincode 
            FROM userDetails_data 
            LIMIT ? OFFSET ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ii", $limit, $offset);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $users = [];
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    
    echo json_encode([
        "data" => $users,
        "pagination" => [
            "total" => $totalRows,
            "page" => $page,
            "limit" => $limit,
            "total_pages" => $totalPages
        ]
    ]);
    $stmt->close();
}

$conn->close();
?>