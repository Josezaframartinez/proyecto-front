<?php
use Illuminate\Database\Eloquent\Model;

class Session extends Model {
    protected $table = 'pruebaproyecto.sessions';
    protected $fillable = ['id', 'user_id', 'data', 'access'];
}
