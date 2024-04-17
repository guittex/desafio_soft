<?php
include_once "Model/Produto.php";

class ProdutoController
{
    private $produto;

    public function __construct()
    {
        $this->produto = new Produto;
    }

    public function listProduto()
    {
        return json_encode(['data' => $this->produto->getProduto()]);
    }

    public function insertProduto()
    {
        $this->produto->setNome($_POST['nome']);
        $this->produto->setValor($_POST['valor']);
        $this->produto->setTipoProdutoId($_POST['tipo_produto_id']);

        if ($this->produto->setProduto($this->produto->getNome(), $this->produto->getValor())) {
            return json_encode(['data' => true]);

        } else {
            return json_encode(['data' => false]);

        }
    }

    public function editProduto()
    {
        $this->produto->setID($_POST['id']);
        $this->produto->setNome($_POST['nome']);
        $this->produto->setValor($_POST['valor']);
        $this->produto->setTipoProdutoId($_POST['tipo_produto_id']);

        if ($this->produto->updateProduto($this->produto->getNome(), $this->produto->getValor(), $this->produto->getID())) {
            return json_encode(['data' => true]);

        } else {
            return json_encode(['data' => false]);

        }
    }

    public function deleteProduto()
    {        
        $this->produto->setID($_POST['id']);

        if ($this->produto->removeProduto($this->produto->getID())) {
            return json_encode(['data' => true]);

        } else {
            return json_encode(['data' => false]);

        }
    }

    public function getTotalProduto()
    {
        if ($this->produto->getTotalProdutos()) {
            return json_encode(['data' => $this->produto->getTotalProdutos()]);

        } else {
            return json_encode(['data' => false]);

        }
    }
    
}