<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

include_once 'Controller/ProdutoController.php';
include_once 'Controller/TipoProdutoController.php';
include_once 'Controller/ImpostoController.php';
include_once 'Controller/VendaController.php';

$controller = $_GET['controller'];
$action = $_GET['action'];
$key = $_GET['key'];

if($key == 'chave-mestra'){
    $controller = new $controller;
    $row = $controller->$action();

    echo $row;
}else{
    die("Chave inválida!");
    
}

