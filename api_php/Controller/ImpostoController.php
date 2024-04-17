<?php
include_once "Model/Imposto.php";

class ImpostoController
{
    private $imposto;

    public function __construct()
    {
        $this->imposto = new Imposto;
    }

    public function listImpostos()
    {
        return json_encode(['data' => $this->imposto->getImpostos()]);
    }

    public function insertImposto()
    {
        $this->imposto->setNome($_POST['nome']);
        $this->imposto->setValor($_POST['valor']);
        $this->imposto->setTipoProdutoId($_POST['tipo_produto_id']);

        
        if ($this->imposto->setImposto($this->imposto->getValor(), $this->imposto->getNome(), $this->imposto->getTipoProdutoId())) {
            return json_encode(['data' => true]);

        } else {
            return json_encode(['data' => false]);

        }
    }

    public function editImposto()
    {
        $this->imposto->setId($_POST['id']);
        $this->imposto->setNome($_POST['nome']);
        $this->imposto->setTipoProdutoId($_POST['tipo_produto_id']);
        $this->imposto->setValor($_POST['valor']);

        if ($this->imposto->updateImposto()) {
            return json_encode(['data' => true]);

        } else {
            return json_encode(['data' => false]);

        }
    }
}
