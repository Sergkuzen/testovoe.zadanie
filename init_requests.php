<?php

use App\Requests;

spl_autoload_register();

echo (new Requests())->post();
