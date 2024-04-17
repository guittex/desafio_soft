<?php
include_once "Model/Venda.php";

class VendaController
{

    private $venda;

    public function __construct()
    {
        $this->venda = new Venda;
    }

    public function getValoresProduto()
    {
        $this->venda->setProdutoId($_POST['produto_id']);

        return json_encode(['data' => $this->venda->getValoresProduto()]);
    }

    public function cadastraVenda()
    {
        $this->venda->setValorTotalImposto($_POST['total_imposto']);
        $this->venda->setValorTotalVenda($_POST['total_venda']);
        $this->venda->setPedidos(json_decode($_POST['pedidos']));

        return json_encode(['data' => $this->venda->insertVenda()]);
    }

    public function listVendas()
    {
        return json_encode(['data' => $this->venda->getVendas()]);
    }

    public function listVendasItens()
    {
        $this->venda->setVendaId($_POST['venda_id']);

        return json_encode(['data' => $this->venda->getVendasItens()]);
    }

    public function getTotalVendas()
    {
        return json_encode(['data' => $this->venda->getTotalVendas()]);
    }

    public function getValorTotalVendas()
    {
        return json_encode(['data' => $this->venda->getValorTotalVendas()]);
    }

    public function getLastVendas()
    {
        return json_encode(['data' => $this->venda->getLastVendas()]);
    }
}