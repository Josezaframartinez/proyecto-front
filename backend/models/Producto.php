<?php

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $table = 'productos';
    protected $fillable = [
        'nombre', 'descripcion', 'categoria', 'precio', 'marca', 
        'condicion', 'ubicacion', 'imagen', 'fecha_vencimiento', 'tipo'
    ];
    
    public $timestamps = false;  // Add this line to disable automatic timestamps
}
