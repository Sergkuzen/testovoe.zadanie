<?php

namespace App\Classes;

class Config
{
    static function get($key) {
        $config_directory = 'app/config/';
        $parts = explode('.', $key);
        $config_name = array_shift($parts);
        $config_file = $config_directory . $config_name . '.php';
        if (file_exists($config_file)) {
            $config = include($config_file);
            foreach ($parts as $part) {
                if (isset($config[$part])) {
                    $config = $config[$part];
                } else {
                    return null;
                }
            }
            return $config;
        } else {
            return null;
        }
    }
}