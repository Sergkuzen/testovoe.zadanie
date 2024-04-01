<?php

namespace app;

use App\Classes\Config;
use App\Classes\CreateJsonResponse;
use PDO;
use PDOException;

class Requests
{
    private object $db;

    public function __construct(){

        try {
            $dsn = "mysql:host=".Config::get('db.host').";dbname=".Config::get('db.database').";charset=utf8";
            $opt = [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ];
            $this->db = new PDO($dsn, Config::get('db.username'), Config::get('db.password'), $opt);
        } catch(PDOException $e) {
            var_dump("Ошибка подключения: " . $e->getMessage());
            exit();
        }
    }

    public function post(): bool|string
    {
        if($_SERVER['REQUEST_METHOD'] == 'POST'){
            $allowed_params = ['action'];
            $check_params = true;
            foreach($allowed_params as $val){
                if(!isset($_POST[$val])){
                    $check_params = false;
                }
            }
            if($check_params){
                $action = (string)$_POST['action'];
                switch ($action) {
                    case 'get_notes':
                        return $this->get_notes();
                    case 'create_note':
                        return $this->create_note();
                    case 'edit_note':
                        return $this->edit_note();
                    case 'delete_note':
                        return $this->delete_note();
                    default:
                        CreateJsonResponse::$error = true;
                        return CreateJsonResponse::gen();
                }
            }else{
                CreateJsonResponse::$error = true;
                return CreateJsonResponse::gen();
            }
        }else{
            CreateJsonResponse::$error = true;
            return CreateJsonResponse::gen();
        }
    }

    private function get_notes(): bool|string
    {
        $stmt = $this->db->prepare("SELECT * FROM `notes` ORDER BY `created_at` DESC");
        $stmt->execute();
        if($stmt->rowCount() > 0){
            $notes = $stmt->fetchAll();
            CreateJsonResponse::$data = $notes;
        }else{
            CreateJsonResponse::$success = false;
            CreateJsonResponse::$message = 'Вы не добавляли заметки';
        }
        return CreateJsonResponse::gen();
    }

    private function create_note(): bool|string
    {
        $db = $this->db;
        $allowed_params = ['title', 'content'];
        $check_params = true;
        foreach($allowed_params as $val){
            if(!isset($_POST[$val])){
                $check_params = false;
            }
        }
        if($check_params){
            $title = !empty($_POST['title']) ? $_POST['title'] : false;
            $content = !empty($_POST['content']) ? $_POST['content'] : false;
            if($title && $content){
                $stmt = $db->prepare("INSERT INTO `notes` (`title`, `content`) VALUES (:title, :content)");
                $stmt->execute([
                    'title' => $title,
                    'content' => $content
                ]);
                CreateJsonResponse::$message = 'Успешное добавление заметки';
            }else{
                CreateJsonResponse::$success = false;
                CreateJsonResponse::$message = 'Заполните все поля';
            }
        }else{
            CreateJsonResponse::$error = true;
        }
        return CreateJsonResponse::gen();
    }

    private function edit_note(): bool|string
    {
        $db = $this->db;
        $allowed_params = ['note_id', 'title', 'content'];
        $check_params = true;
        foreach($allowed_params as $val){
            if(!isset($_POST[$val])){
                $check_params = false;
            }
        }
        if($check_params){
            $note_id = (int)$_POST['note_id'];
            $stmt = $this->db->prepare("SELECT * FROM `notes` WHERE `id` = :note_id LIMIT 1");
            $stmt->execute([
                'note_id' => $note_id
            ]);
            if($stmt->rowCount() > 0){
                $title = !empty($_POST['title']) ? $_POST['title'] : false;
                $content = !empty($_POST['content']) ? $_POST['content'] : false;
                if($title && $content){
                    $stmt = $db->prepare("UPDATE `notes` SET `title` = :title, `content` = :content WHERE `id` = :note_id");
                    $stmt->execute([
                        'title' => $title,
                        'content' => $content,
                        'note_id' => $note_id,
                    ]);
                    CreateJsonResponse::$message = 'Успешное обновление заметки';
                }else{
                    CreateJsonResponse::$success = false;
                    CreateJsonResponse::$message = 'Заполните все поля';
                }
            }else{
                CreateJsonResponse::$success = false;
                CreateJsonResponse::$message = 'Заметки не существует';
            }
        }else{
            CreateJsonResponse::$error = true;
        }
        return CreateJsonResponse::gen();
    }

    private function delete_note(): bool|string
    {
        $db = $this->db;
        $allowed_params = ['note_id'];
        $check_params = true;
        foreach($allowed_params as $val){
            if(!isset($_POST[$val])){
                $check_params = false;
            }
        }
        if($check_params){
            $note_id = (int)$_POST['note_id'];
            $stmt = $db->prepare("SELECT * FROM `notes` WHERE `id` = :note_id LIMIT 1");
            $stmt->execute([
                'note_id' => $note_id
            ]);
            if($stmt->rowCount() > 0){
                $stmt = $db->prepare("DELETE FROM `notes` WHERE `id` = :note_id");
                $stmt->execute([
                    'note_id' => $note_id
                ]);
            }else{
                CreateJsonResponse::$success = false;
            }
        }else{
            CreateJsonResponse::$error = true;
        }
        return CreateJsonResponse::gen();
    }
}