<?php
require_once('db_conn.php');

// Allow from any origin or restrict to specific origins if needed
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

    // Prepare and execute the SQL statement to retrieve ticket data
    $stmt = $pdo->prepare('SELECT * FROM tickets');
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return a success response with the retrieved tickets
    echo json_encode([
        'status' => 'success', 
        'message' => 'Ticket saved!', 
        'tickets' => $results
    ]);
} catch (PDOException $e) {
    // Return an error response with the exception message
    echo json_encode([
        'status' => 'error', 
        'message' => $e->getMessage()
    ]);
}
