<?php

namespace App\Classes;

class CreateJsonResponse
{
    static bool $error = false;
    static bool $success = true;
    static mixed $message = '';
    static array $data = array();

    static function gen(): bool|string
    {
        $response = [
            'error' => self::$error,
            'success' => self::$success,
            'message' => self::$message
        ];
        if(!empty(self::$data))
            $response['data'] = self::$data;

        header('Content-Type: application/json');
        return json_encode($response);
    }
}