<?php
require_once "Connection.php";

class Imposto extends DbConnect
{
    private $id;
    private $nome;
    private $valor;
    private $tipo_produto_id;

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

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
        $this->valor = $valor;
    }

    public function getTipoProdutoId()
    {
        return $this->tipo_produto_id;
    }

    public function setTipoProdutoId($tipo_produto_id)
    {
        $this->tipo_produto_id = $tipo_produto_id;
    }

    private function formatTipoProdutos($impostos)
    {
        if(count($impostos) >= 1){
            foreach ($impostos as $key => $imposto) {
                $stringFormatada = "";

                $tipo_produtos = $this->getTipoProdutoImposto($imposto['id']);

                if($tipo_produtos != null){
                    foreach ($tipo_produtos as $key2 => $tipo_produto) {    
                        $stringFormatada .= $tipo_produto['nome'] . ", ";
                    }
    
                    $impostos[$key]["tipo_produtos_nomes"] = substr($stringFormatada, 0, -2);
                }
                
                
            }
        }

        return $impostos ?? [];
    }

    private function getTipoProdutoImposto($id)
    {
        $sql = "SELECT ip.tipo_produto_id, ip.imposto_id, tp.nome 
            FROM imposto_produtos ip 
            LEFT JOIN tipo_produtos tp ON tp.id = ip.tipo_produto_id 
            WHERE imposto_id = $id";

        $query = $this->connect()->prepare($sql);

        $query->execute();

        $tipo_produto = $query->fetchAll(PDO::FETCH_ASSOC);

        return $tipo_produto;
    }

    public function getImpostos()
    {
        $sql = "SELECT * FROM impostos";

        $query = $this->connect()->prepare($sql);

        $query->execute();

        $produtos = $this->formatTipoProdutos($query->fetchAll(PDO::FETCH_ASSOC));

        return $produtos;
    }

    private function getLastInsertIdImposto()
    {
        $sql = "SELECT id FROM impostos ORDER BY id DESC LIMIT 1;";

        $stmt = $this->connect()->prepare($sql);

        $stmt->execute();

        $imposto_id = $stmt->fetch(PDO::FETCH_ASSOC);

        return $imposto_id['id'];
    }

    private function cadastrarImpostoTipoProdutos($tipo_produto_id)
    {
        $imposto_id = $this->getLastInsertIdImposto();

        $tipo_produtos = explode(",", $tipo_produto_id);

        foreach ($tipo_produtos as $key => $tipo_produto) {
            $sql = "INSERT INTO imposto_produtos (tipo_produto_id, imposto_id, created_at, modified_at) VALUES (:tipo_produto_id, :imposto_id, NOW(), NOW())";

            $stmt = $this->connect()->prepare($sql);

            $stmt->execute([':tipo_produto_id' => $tipo_produto, ":imposto_id" => $imposto_id]);
        }

    }

    private function atualizaImpostoTipoProdutos($tipo_produto_id, $imposto_id)
    {
        $stmt = $this->connect()->prepare('DELETE FROM imposto_produtos WHERE imposto_id = :imposto_id');

        $stmt->execute([":imposto_id" => $imposto_id]);

        $tipo_produtos = explode(",", $tipo_produto_id);

        foreach ($tipo_produtos as $key => $tipo_produto) {
            $sql = "INSERT INTO imposto_produtos (tipo_produto_id, imposto_id, created_at, modified_at) VALUES (:tipo_produto_id, :imposto_id, NOW(), NOW())";

            $stmt = $this->connect()->prepare($sql);

            $stmt->execute([':tipo_produto_id' => $tipo_produto, ":imposto_id" => $imposto_id]);
        }
    }

    public function setImposto($valor, $nome, $tipo_produto_id)
    {
        $sql = "INSERT INTO impostos (valor, nome, created_at, modified_at) VALUES (:valor, :nome, NOW(), NOW())";

        $stmt = $this->connect()->prepare($sql);

        if (!$stmt->execute([':valor' => $valor, ":nome" => $nome])){
            return false;

        }

        $this->cadastrarImpostoTipoProdutos($tipo_produto_id);

        return true;
    }

    public function updateImposto()
    {        
        $this->atualizaImpostoTipoProdutos($this->tipo_produto_id, $this->id);

        $sql = 'UPDATE impostos SET nome=:nome, valor=:valor, modified_at=NOW() WHERE id = :id';
        
        $stmt = $this->connect()->prepare($sql);

        if (!$stmt->execute([':id' => $this->id, ":nome" => $this->nome, ":valor" => $this->valor])){
            return false;

        }

        return true;
    }
}