<?php

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'usuarios';
    protected $fillable = [
        'nombres', 'apellidos', 'correo_electronico', 'genero', 'contraseña', 'numero_telefono'
    ];

    public $timestamps = false;
}
