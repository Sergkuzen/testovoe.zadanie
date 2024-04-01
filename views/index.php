<?php
    use App\Classes\Config;
?>

<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, viewport-fit=cover">
    <title><?= Config::get('app.name') ?></title>
    <link href="/assets/css/bootstrap.css" rel="stylesheet"/>
    <link href="/assets/css/styles.css" rel="stylesheet"/>
    <script src="/assets/js/jquery.3.7.1.js"></script>
    <script src="/assets/js/index.js" type="module"></script>
</head>
<body>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-4">
                <div class="nav-container">
                    <ul class="nav nav-pills flex-column mb-auto">
                        <li class="nav-item">
                            <a href="#" class="nav-link active" data-value="my-notes">
                                <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#home"></use></svg>
                                Мои заметки
                            </a>
                        </li>
                        <li>
                            <a href="#" class="nav-link" data-value="create-note">
                                <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg>
                                Добавить заметку
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-md-8">
                <div class="notes-container"></div>
            </div>
        </div>
    </div>
    <script>
        const DEBUG = '<?= Config::get('app.debug_mode') ?>' === '1';
        const APP_NAME = '<?= Config::get('app.name') ?>'
        const APP_URL = '<?= Config::get('app.url') ?>'
    </script>
</body>
</html>


