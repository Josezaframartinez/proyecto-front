<?php
session_start();

// Verificar si la sesión está activa
if (isset($_SESSION['user_id'])) {
    $response = [
        'success' => true,
        'message' => 'Sesión activa',
        'user_id' => $_SESSION['user_id']
    ];
} else {
    $response = [
        'success' => false,
        'message' => 'No hay sesión activa'
    ];
}

header('Content-Type: application/json');
echo json_encode($response);
