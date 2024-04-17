<?php
require_once "Connection.php";

class Venda extends DbConnect
{
    private $venda_id;
    private $produto_id;
    private $pedidos;
    private $valor_total_venda;
    private $valor_total_imposto;

    public function setVendaId($venda_id)
    {
        $this->venda_id = $venda_id;
    }

    public function getVendaId()
    {
        return $this->venda_id;
    }

    public function setProdutoId($produto_id)
    {
        $this->produto_id = $produto_id;
    }

    public function getProdutoId()
    {
        return $this->produto_id;
    }

    public function setPedidos($pedidos)
    {
        $this->pedidos = $pedidos;
    }

    public function getPedidos()
    {
        return $this->pedidos;
    }

    public function setValorTotalVenda($valor_total_venda)
    {
        $this->valor_total_venda = $valor_total_venda;
    }

    public function getValorTotalVenda()
    {
        return $this->valor_total_venda;
    }

    public function setValorTotalImposto($valor_total_imposto)
    {
        $this->valor_total_imposto = $valor_total_imposto;
    }

    public function getValorTotalImposto()
    {
        return $this->valor_total_imposto;
    }

    public function getValoresProduto()
    {
        $stmt = $this->connect()->prepare("SELECT * FROM produtos WHERE id=:id");

        $stmt->execute([':id' => $this->produto_id]);

        $produto = $stmt->fetch(PDO::FETCH_ASSOC);

        $sql = "SELECT ip.tipo_produto_id, ip.imposto_id, i.nome, i.valor
            FROM imposto_produtos ip
            LEFT JOIN impostos i ON i.id = ip.imposto_id 
            WHERE ip.tipo_produto_id = :tipo_produto_id";

        $stmt = $this->connect()->prepare($sql);

        $stmt->execute([':tipo_produto_id' => $produto['tipo_produto_id']]);

        $impostos = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return ['imposto' => $impostos, 'produto' => $produto];
    }

    public function insertVenda()
    {
        $sql = "INSERT INTO vendas (valor_total_venda, valor_total_imposto, created_at, modified_at) VALUES (:valor_total_venda, :valor_total_imposto, NOW(), NOW())";

        $stmt = $this->connect()->prepare($sql);

        if(!$stmt->execute([':valor_total_venda' => $this->valor_total_venda, ":valor_total_imposto" => $this->valor_total_imposto])){
            return false;

        }

        $this->insertPedidos();

        return true;
    }

    private function insertPedidos()
    {
        $venda_id = $this->getLastVendaId();

        foreach ($this->pedidos as $key => $pedido) {
            $sql = "INSERT INTO venda_itens (produto_id, valor_liquido, valor_imposto, created_at, modified_at, venda_id) VALUES (:produto_id, :valor_liquido, :valor_imposto, NOW(), NOW(), :venda_id)";

            $stmt = $this->connect()->prepare($sql);

            $stmt->execute([':produto_id' => $pedido->produto_id, ":valor_liquido" => $pedido->valor_liquido, ":valor_imposto" => $pedido->valor_imposto, ":venda_id" => $venda_id ]);
        }
    }

    private function getLastVendaId()
    {
        $sql = "SELECT id FROM vendas ORDER BY id DESC LIMIT 1;";

        $stmt = $this->connect()->prepare($sql);

        $stmt->execute();

        $venda_id = $stmt->fetch(PDO::FETCH_ASSOC);

        return $venda_id['id'];
    }

    public function getVendas()
    {
        $sql = "SELECT DATE_FORMAT(v.created_at, '%d/%m/%Y %H:%i') as created_at, v.valor_total_venda, v.id FROM vendas v";

        $stmt = $this->connect()->prepare($sql);

        $stmt->execute();

        $vendas = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $vendas;
    }

    public function getVendasItens()
    {
        $sql = "SELECT vi.produto_id, vi.valor_liquido, vi.valor_imposto, p.nome 
            FROM venda_itens vi 
            INNER JOIN produtos p ON p.id = vi.produto_id
            WHERE vi.venda_id = :venda_id";

        $stmt = $this->connect()->prepare($sql);

        $stmt->execute([':venda_id' => $this->venda_id]);

        $vendas = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $vendas;
    }

    public function getTotalVendas()
    {
        $sql = "SELECT count(*) as total_venda FROM vendas";

        $stmt = $this->connect()->prepare($sql);

        $stmt->execute();

        $vendas = $stmt->fetch(PDO::FETCH_ASSOC);

        return $vendas['total_venda'];
    }

    public function getValorTotalVendas()
    {
        
        $sql = "SELECT sum(valor_total_venda) as valor_total_vendas FROM vendas";

        $stmt = $this->connect()->prepare($sql);

        $stmt->execute();

        $vendas = $stmt->fetch(PDO::FETCH_ASSOC);

        return $vendas['valor_total_vendas'];
    }

    public function getLastVendas()
    {
        $sql = "SELECT DATE_FORMAT(v.created_at, '%d/%m/%Y %H:%i') as created_at, v.valor_total_venda, v.id FROM vendas v ORDER BY v.id DESC LIMIT 10";

        $stmt = $this->connect()->prepare($sql);

        $stmt->execute();

        $vendas = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $vendas;
    }
}