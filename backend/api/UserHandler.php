<?php
session_start();

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

require_once '../bootstrap.php';
require_once '../models/Usuario.php';

$data = json_decode(file_get_contents("php://input"), true);

class UserHandler {
    public static function registerNewUser($registroData) {
        if (!$registroData || !isset($registroData['email'], $registroData['password'], $registroData['nombre'], $registroData['apellido'], $registroData['genero'], $registroData['numero'])) {
            return ['success' => false, 'error' => 'Faltan campos requeridos'];
        }

        if (!filter_var($registroData['email'], FILTER_VALIDATE_EMAIL)) {
            return ['success' => false, 'error' => 'Formato de correo electrónico no válido'];
        }

        if (Usuario::where('correo_electronico', $registroData['email'])->exists()) {
            return ['success' => false, 'error' => 'El correo electrónico ya está registrado'];
        }

        try {
            $usuario = Usuario::create([
                'nombres' => $registroData['nombre'],
                'apellidos' => $registroData['apellido'],
                'correo_electronico' => $registroData['email'],
                'genero' => $registroData['genero'],
                'contraseña' => password_hash($registroData['password'], PASSWORD_DEFAULT),
                'numero_telefono' => $registroData['numero'],
                'perfil' => $registroData['perfil']  // Añadir perfil al registro
            ]);
            return ['success' => true, 'message' => 'Usuario registrado con éxito', 'perfil' => $usuario->perfil, 'nombres' => $usuario->nombres, 'foto' => $usuario->foto];
        } catch (Exception $e) {
            error_log('Error en registro: ' . $e->getMessage());
            return ['success' => false, 'error' => 'Error durante el registro'];
        }
    }

    public static function loginUser($loginData) {
        if (empty($loginData['email']) || empty($loginData['password'])) {
            return ['success' => false, 'error' => 'Falta información para el inicio de sesión'];
        }

        $usuario = Usuario::where('correo_electronico', $loginData['email'])->first();

        if ($usuario) {
            if (password_verify($loginData['password'], $usuario->contraseña)) {
                // Verificar si el usuario ya tiene una sesión activa
                if (isset($_SESSION['user_id']) && $_SESSION['user_id'] == $usuario->id) {
                    return ['success' => false, 'error' => 'El usuario ya tiene una sesión activa.'];
                }

                // Almacena la sesión del usuario
                $_SESSION['user_id'] = $usuario->id;
                return ['success' => true, 'message' => '¡Bienvenido!', 'perfil' => $usuario->perfil, 'nombres' => $usuario->nombres, 'foto' => $usuario->foto];
            } else {
                return ['success' => false, 'error' => 'Credenciales incorrectas'];
            }
        } else {
            return ['success' => false, 'error' => 'Usuario no encontrado'];
        }
    }
}

// Obtener la acción para determinar qué método llamar
$action = isset($_GET['action']) ? $_GET['action'] : null;

switch ($action) {
    case 'loginUser':
        $response = UserHandler::loginUser($data);
        break;
    case 'registerNewUser':
        $response = UserHandler::registerNewUser($data);
        break;
 
    default:
        $response = ['success' => false, 'message' => 'No se proporcionó una acción válida'];
}

echo json_encode($response);
