<?php
include_once "Model/TipoProduto.php";

class TipoProdutoController
{
    private $tipo_produto;

    public function __construct()
    {
        $this->tipo_produto = new TipoProduto;
    }

    public function listTipoProduto()
    {
        return json_encode(['data' => $this->tipo_produto->getTipoProduto()]);
    }

    public function insertTipoProduto()
    {
        $this->tipo_produto->setNome($_POST['nome']);

        if ($this->tipo_produto->setTipoProduto($this->tipo_produto->getNome())) {
            return json_encode(['data' => true]);

        } else {
            return json_encode(['data' => false]);

        }
    }

    public function deleteTipoProduto()
    {
        $this->tipo_produto->setID($_POST['id']);

        if ($this->tipo_produto->removeTipoProduto($this->tipo_produto->getID())) {
            return json_encode(['data' => true]);

        } else {
            return json_encode(['data' => false]);

        }
    }

    public function editTipoProduto()
    {
        $this->tipo_produto->setID($_POST['id']);
        $this->tipo_produto->setNome($_POST['nome']);

        if ($this->tipo_produto->updateTipoProduto($this->tipo_produto->getID(), $this->tipo_produto->getNome())) {
            return json_encode(['data' => true]);

        } else {
            return json_encode(['data' => false]);

        }
    }
}