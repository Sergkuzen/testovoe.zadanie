<?php

use App\Classes\Config;

@session_start();

$_OPTIMIZATION = array();

# Подключение классов для пространства имен
spl_autoload_register();

# Подключаемся к базе данных MySQL
try {
    $dsn = "mysql:host=".Config::get('db.host').";dbname=".Config::get('db.database').";charset=utf8";
    $opt = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $db = new PDO($dsn, Config::get('db.username'), Config::get('db.password'), $opt);
} catch(PDOException $e) {
    echo "Ошибка подключения: " . $e->getMessage();
    exit();
}

# Загрузка страницы
@require_once("views/index.php");