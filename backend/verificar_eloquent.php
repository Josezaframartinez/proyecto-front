<?php

require 'bootstrap.php';
require 'Producto.php';

// Intenta obtener una lista de productos para verificar la conexión y configuración de Eloquent
try {
    $productos = Producto::all();
    if ($productos->isEmpty()) {
        echo "Conexión exitosa, pero no hay productos en la base de datos.";
    } else {
        echo "Conexión exitosa y se encontraron productos en la base de datos:\n";
        foreach ($productos as $producto) {
            echo "- " . $producto->nombre . "\n";
        }
    }
} catch (Exception $e) {
    echo "Error al conectar con la base de datos: " . $e->getMessage();
}
