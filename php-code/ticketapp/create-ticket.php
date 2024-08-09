<?php
require_once('db_conn.php');

// Allow from any origin, or restrict to specific origins if needed
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400'); // Cache for 1 day
}

// Handle preflight OPTIONS request
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

    // Prepare and execute the SQL statement to insert ticket data
    $stmt = $pdo->prepare(
        'INSERT INTO tickets (device_ref_number, complaint, category, ticket_number, `status`) 
        VALUES (?, ?, ?, ?, ?)'
    );
    $stmt->execute([
        $data['deviceRefNumber'],
        $data['complaint'],
        $data['category'],
        $data['ticketNumber'],
        1
    ]);

    // Get the ID of the last inserted record
    $lastInsertId = $pdo->lastInsertId();

    // Return a success response with the last inserted ID
    echo json_encode([
        'status' => 'success',
        'message' => 'Ticket saved!',
        'lastInsertId' => $lastInsertId
    ]);
} catch (PDOException $e) {
    // Return an error response with the exception message
    echo json_encode([
        'status' => 'error',
        'message' => $e->getMessage()
    ]);
}
