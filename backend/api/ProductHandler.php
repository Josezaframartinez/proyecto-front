<?php

require_once '../bootstrap.php';
require_once '../models/Producto.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

class ProductosHandler {
    public function getProducts() {
        try {
            $products = Producto::orderBy('categoria')->orderBy('id')->get()->toArray();
            return ['success' => true, 'products' => $products];
        } catch (Exception $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }

    public function addProduct($productData) {
        $errors = $this->validateProductData($productData);
        if (!empty($errors)) {
            return ['success' => false, 'message' => implode(', ', $errors)];
        }

        try {
            $producto = Producto::create((array) $productData);
            if ($producto) {
                return ['success' => true, 'message' => 'Producto agregado con éxito'];
            } else {
                return ['success' => false, 'message' => 'Error al agregar producto'];
            }
        } catch (Exception $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }

    public function updateProduct($productData) {
        $errors = $this->validateProductData($productData, true);
        if (!empty($errors)) {
            return ['success' => false, 'message' => implode(', ', $errors)];
        }

        try {
            $producto = Producto::find($productData->id);
            if ($producto) {
                $producto->update((array) $productData);
                return ['success' => true, 'message' => 'Producto actualizado con éxito'];
            } else {
                return ['success' => false, 'message' => 'Producto no encontrado'];
            }
        } catch (Exception $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }

    public function deleteProduct($id) {
        try {
            $producto = Producto::find($id);
            if ($producto) {
                $producto->delete();
                return ['success' => true, 'message' => 'Producto eliminado con éxito'];
            } else {
                return ['success' => false, 'message' => 'Producto no encontrado'];
            }
        } catch (Exception $e) {
            return ['success' => false, 'message' => $e->getMessage()];
        }
    }

    private function validateProductData($data, $isUpdate = false) {
        $errors = [];
        $fields = ['nombre', 'descripcion', 'categoria', 'precio', 'marca', 'condicion', 'ubicacion', 'imagen', 'fecha_vencimiento', 'tipo'];
        if ($isUpdate) {
            $fields[] = 'id';
        }
        foreach ($fields as $field) {
            if (empty($data->$field)) {
                $errors[] = "Field '$field' is required.";
            }
        }
        return $errors;
    }
}

$handler = new ProductosHandler();
$data = json_decode(file_get_contents("php://input"));

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$response = ['success' => false, 'message' => 'Invalid request'];
try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($data->action)) {
        switch ($data->action) {
            case 'add':
                $response = $handler->addProduct($data);
                break;
            case 'update':
                $response = $handler->updateProduct($data);
                break;
            case 'delete':
                $response = $handler->deleteProduct($data->id);
                break;
            default:
                $response = ['success' => false, 'message' => 'Acción no reconocida'];
                break;
        }
    } else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $response = $handler->getProducts();
    } else {
        http_response_code(405);
        $response = ['success' => false, 'message' => 'Método no permitido'];
    }
} catch (Exception $e) {
    $response = ['success' => false, 'message' => $e->getMessage()];
}

echo json_encode($response);
