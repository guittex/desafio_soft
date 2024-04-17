<?php
require_once "Connection.php";

class Produto extends DbConnect
{
    private $id;
    private $nome;
    private $valor;
    private $tipo_produto_id;

    public function getNome()
    {
        return $this->nome;
    }

    public function setNome($nome)
    {
        $this->nome = $nome;
    }

    public function getValor()
    {
        return $this->valor;
    }

    public function setValor($valor)
    {
        $this->valor = str_replace(",", ".", $valor);
    }

    public function getID()
    {
        return $this->id;
    }

    public function setID($id)
    {
        $this->id = $id;
    }

    public function setTipoProdutoId($tipo_produto_id)
    {
        $this->tipo_produto_id = $tipo_produto_id;
    }

    public function getTipoProdutoId()
    {
        return $this->tipo_produto_id;
    }

    public function getProduto()
    {
        $sql = "SELECT p.id, p.nome, p.valor, p.created_at, p.modified_at, p.tipo_produto_id, tp.nome as tipo_produto
            FROM produtos p
            LEFT JOIN tipo_produtos as tp on tp.id = p.tipo_produto_id
            ORDER BY p.id";

        $query = $this->connect()->prepare($sql);

        $query->execute();

        $produtos = $query->fetchAll(PDO::FETCH_ASSOC);

        return $produtos;
    }

    public function setProduto($nome, $valor){
        $sql = "INSERT INTO produtos (nome, valor, created_at, modified_at, tipo_produto_id) VALUES (:nome, :valor, NOW(), NOW(), :tipo_produto_id)";

        $stmt = $this->connect()->prepare($sql);
        
        if (!$stmt->execute([':nome' => $nome, ":valor" => $valor, ":tipo_produto_id" => $this->tipo_produto_id])){
            return false;

        }
        return true;
    }

    public function updateProduto($nome, $valor, $id)
    {
        $sql = 'UPDATE produtos SET nome=:nome, valor=:valor, modified_at=NOW(), tipo_produto_id=:tipo_produto_id WHERE id = :id';

        $stmt = $this->connect()->prepare($sql);

        if (!$stmt->execute([':nome' => $nome, ':valor' => $valor, ':id' => $id, ":tipo_produto_id" => $this->tipo_produto_id])){
            return false;

        }

        return true;
    }

    public function removeProduto($id)
    {
        $sql = 'DELETE FROM produtos WHERE id = :id';

        $stmt = $this->connect()->prepare($sql);

        if (!$stmt->execute([':id' => $id])){
            return false;

        }

        return true;
    }

    public function getTotalProdutos()
    {
        $sql = "SELECT count(*) as total_produtos from produtos";

        $query = $this->connect()->prepare($sql);

        $query->execute();

        $produtos = $query->fetch(PDO::FETCH_ASSOC);

        return $produtos['total_produtos'];
    }
}