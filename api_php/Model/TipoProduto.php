<?php 
require_once "Connection.php";

class TipoProduto extends DbConnect
{
    private $id;
    private $nome;

    public function getNome()
    {
        return $this->nome;
    }

    public function setNome($nome)
    {
        $this->nome = $nome;
    }

    public function getID()
    {
        return $this->id;
    }

    public function setID($id)
    {
        $this->id = $id;
    }

    public function setTipoProduto($nome){
        $sql = "INSERT INTO tipo_produtos (nome, created_at, modified_at) VALUES (:nome, NOW(), NOW())";

        $stmt = $this->connect()->prepare($sql);

        if (!$stmt->execute([':nome' => $nome])){
            return false;

        }
        return true;
    }

    public function getTipoProduto()
    {
        $sql = "SELECT * FROM tipo_produtos";

        $query = $this->connect()->prepare($sql);

        $query->execute();

        $produtos = $query->fetchAll(PDO::FETCH_ASSOC);

        return $produtos;
    }

    public function removeTipoProduto($id)
    {
        $sql = 'DELETE FROM tipo_produtos WHERE id = :id';

        $stmt = $this->connect()->prepare($sql);

        if (!$stmt->execute([':id' => $id])){
            return false;

        }

        return true;
    }

    public function updateTipoProduto($id, $nome)
    {
        $sql = 'UPDATE tipo_produtos SET nome=:nome, modified_at=NOW() WHERE id = :id';
        
        $stmt = $this->connect()->prepare($sql);

        if (!$stmt->execute([':id' => $id, ":nome" => $nome])){
            return false;

        }

        return true;
    }
}