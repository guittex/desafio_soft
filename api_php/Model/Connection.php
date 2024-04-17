<?php
class DbConnect
{
    private $hostname = "127.0.0.1";
    private  $username = "root";
    private $password = "root";
    private $database = "desafio_soft";
    private $port = "8889";

    public function __contruct()
    {
        $this->connect();
    }

    public function connect()
    {
        try {
            $conn = new PDO('mysql:host=' . $this->hostname . ';port=' . $this->port .  ';dbname='. $this->database, $this->username, $this->password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $conn;
        } catch (\Exception $e) {
            echo "Erro de conexão: " . $e->getMessage();
        }
    }

    public function d($data){
        if(is_null($data)){
            $str = "<i>NULL</i>";
        }elseif($data == ""){
            $str = "<i>Empty</i>";
        }elseif(is_array($data)){
            if(count($data) == 0){
                $str = "<i>Empty array.</i>";
            }else{
                $str = "<table style=\"border-bottom:0px solid #000;\" cellpadding=\"0\" cellspacing=\"0\">";
                foreach ($data as $key => $value) {
                    $str .= "<tr><td style=\"background-color:#008B8B; color:#FFF;border:1px solid #000;\">" . $key . "</td><td style=\"border:1px solid #000;\">" . $this->d($value) . "</td></tr>";
                }
                $str .= "</table>";
            }
        }elseif(is_object($data)){
            $str = $this->d(get_object_vars($data));
        }elseif(is_bool($data)){
            $str = "<i>" . ($data ? "True" : "False") . "</i>";
        }else{
            $str = $data;
            $str = preg_replace("/\n/", "<br>\n", $str);
        }
        return $str;
    }
    
    public function dnl($data){
        echo $this->d($data) . "<br>\n";
    }
    
    public function dd($data){
        echo $this->dnl($data);
        exit;
    }
}


