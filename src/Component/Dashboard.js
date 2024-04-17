
import axios from 'axios';
import { useEffect, useState } from "react";
import CurrencyFormat from 'react-currency-format';

function Dashboard() {
    useEffect(()=>{
        getTotalProdutos();
        getTotalVendas();
        getValorTotalVendas();
        listLastVendas();
    }, []);

    const [totalProdutos, setTotalProdutos] = useState();
    const [totalVendas, setTotalVendas] = useState();
    const [totalValorVendas, setTotalValorVendas] = useState();
    const [lastVendas, setLastVendas] = useState([]);

    const listLastVendas = () => {
        axios.get("http://localhost:8080/route.php?controller=VendaController&action=getLastVendas&key=chave-mestra").then(function (request){
            setLastVendas(request.data['data']);            
        })
    }

    const getTotalProdutos = () => {
        axios.get("http://localhost:8080/route.php?controller=ProdutoController&action=getTotalProduto&key=chave-mestra").then(function (request){
            setTotalProdutos(request.data['data']);            
        })
    }

    const getTotalVendas = () => {
        axios.get("http://localhost:8080/route.php?controller=VendaController&action=getTotalVendas&key=chave-mestra").then(function (request){
            setTotalVendas(request.data['data']);            
        })
    }

    const getValorTotalVendas = () => {
        axios.get("http://localhost:8080/route.php?controller=VendaController&action=getValorTotalVendas&key=chave-mestra").then(function (request){
            setTotalValorVendas(request.data['data']);            
        })
    }

    return(
        <div className="container-fluid p-3">
            <div className="row">
                <div className="col-md-4">
                    <div class="box-dash">
                        <div class="icon">
                            <i className="fa fa-box" style={{fontSize : '30px'}}></i>
                        </div> 
                        <h3 className="m-t-10">{totalProdutos}</h3>
                        <h4 class="bolder">Produtos Cadastrados</h4>
                    </div>
                </div>
                <div className="col-md-4">
                    <div class="box-dash">
                        <div class="icon">
                            <i className="fa fa-dollar-sign" style={{fontSize : '30px'}}></i>
                        </div> 
                        <h3 className="m-t-10">{<CurrencyFormat value={totalValorVendas ? String(totalValorVendas) : 0} displayType={'text'} thousandSeparator={true} prefix={'R$ '} />}</h3>
                        <h4 class="bolder">Valor Total de Vendas</h4>
                    </div>
                </div>
                <div className="col-md-4">
                    <div class="box-dash">
                        <div class="icon">
                            <i className="fa fa-ranking-star" style={{fontSize : '30px'}}></i>
                        </div> 
                        <h3 className="m-t-10">{totalVendas}</h3>
                        <h4 class="bolder">Total de Vendas Feita</h4>
                    </div>
                </div>
                <div className="col-md-12 m-t-20" style={{height : '490px', overflow : 'auto'}}>
                    <h3>Últimas 10 Vendas</h3>
                    <hr/>
                    <table class="table table-responsive">
                        <thead>
                            <tr>
                            <th scope="col">Código</th>
                            <th scope="col">Data Venda</th>
                            <th scope="col">Valor Total Venda</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lastVendas.map((venda, key) => 
                                <tr key={key}>
                                    <td>{venda.id}</td>
                                    <td>{venda.created_at}</td>
                                    <td><CurrencyFormat value={venda.valor_total_venda ? String(venda.valor_total_venda) : 0} displayType={'text'} thousandSeparator={true} prefix={'R$ '} /></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;