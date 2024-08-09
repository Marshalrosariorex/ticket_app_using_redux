<?php
// Assuming you're using PDO for MySQL
try {
    $pdo = new PDO('mysql:host=localhost;dbname=ticket_test', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
