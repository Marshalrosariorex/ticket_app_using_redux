<?php
require_once('db_conn.php');

// Set CORS headers to allow access from specific origins
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400'); // Cache for 1 day
}

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PATCH, DELETE");
    }
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }
    exit(0);
}

try {
    // Decode JSON input data
    $data = json_decode(file_get_contents('php://input'), true);

    // Prepare the SQL statement with bound parameters
    $stmt = $pdo->prepare('UPDATE tickets SET status = :status WHERE ticket_number = :ticket_number');
    $stmt->bindParam(':status', $data['ticket_status']);
    $stmt->bindParam(':ticket_number', $data['ticket_number']);

    // Execute the statement
    $stmt->execute();

    // Check the number of affected rows
    $affectedRows = $stmt->rowCount();

    // Prepare the response based on the result
    if ($affectedRows > 0) {
        $response = ['status' => 'success', 'message' => 'Ticket updated successfully'];
    } else {
        $response = ['status' => 'error', 'message' => 'Ticket not found or update failed'];
    }

    // Send the JSON response
    echo json_encode($response);
} catch (PDOException $e) {
    // Log the error for debugging purposes
    error_log($e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'Database error']);
}
