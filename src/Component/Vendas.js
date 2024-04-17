import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import Impostos from "./Impostos";
import CurrencyFormat from 'react-currency-format';


function Vendas() {
    useEffect(()=>{
        listVendas();
        listProdutos();
    }, []);

    const [alertElement, setAlert] = useState(false);
    const [msgAlert, setMsg] = useState();
    const [variant, setVariant] = useState();
    const [modalAdicionar, setModalAdicionar] = useState(false);
    const [produtos, setProdutos] =  useState([]);
    const [totalImposto, setTotalImposto] = useState();
    const [totalVenda, setTotalVenda] = useState();
    const [pedidos, setPedidos] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState();
    const [vendas, setVendas] =  useState([]);
    const [pedidoItens, setPedidosItens] = useState([]);
    const [modalItens, setModalItens] = useState();

    const abrirModalItens  = (venda_id) => {
        setModalItens(true);

        let formData = new FormData();

        formData.append('venda_id', venda_id);     

        axios.post("http://localhost:8080/route.php?controller=VendaController&action=listVendasItens&key=chave-mestra", formData).then(function (request){
            setPedidosItens(request.data['data']);            

        })
    }
    const fecharModalItens  = () => {
        setModalItens(false);
    }

    const fecharAlerta = () => {
        setAlert(false);
    }

    const fecharModalAdicionar = () => {
        setModalAdicionar(false);
    }

    const abrirModalAdicionar = () => {
        setTotalVenda(0);
        setTotalImposto(0);
        setPedidos([]);
        setProdutoSelecionado("");
        setModalAdicionar(true);
    }

    const adicionarVenda = () => {
        if(totalVenda == 0){
            alert("Cadastre os produtos antes de proseguir");
            return;
        }

        let formData = new FormData();

        formData.append('total_venda', totalVenda);
        formData.append('total_imposto', totalImposto);
        formData.append('pedidos', JSON.stringify(pedidos));

        axios.post("http://localhost:8080/route.php?controller=VendaController&action=cadastraVenda&key=chave-mestra", formData).then(function (request){
            if(request.data['data']){
                setVariant('success');
                setMsg('Venda cadastrada com sucesso');

            }else{
                setVariant('danger');
                setMsg('Erro ao cadastrar vendar');

            }

            setAlert(true);
            fecharModalAdicionar();
            listVendas();

            setTimeout(function() {
                setAlert(false);
            }, 10000)
        });
    }

    const listVendas = () => {
        axios.get("http://localhost:8080/route.php?controller=VendaController&action=listVendas&key=chave-mestra").then(function (request){
            setVendas(request.data['data']);            
        })
    }

    const listProdutos = () => {
        axios.get("http://localhost:8080/route.php?controller=ProdutoController&action=listProduto&key=chave-mestra").then(function (request){
            setProdutos(request.data['data']);            
        })
    }

    const  getPercentage = (porcentagem, valorTotal) =>  {
        return (porcentagem * valorTotal) / 100;
    }

    const adicionarItemVenda = () => {
        if(produtoSelecionado == ""){
            alert("Selecione o produto antes de prosseguir");
            return;
        }
        
        let formData = new FormData();

        formData.append('produto_id', produtoSelecionado);

        axios.post("http://localhost:8080/route.php?controller=VendaController&action=getValoresProduto&key=chave-mestra", formData).then(function (request){
            let data = request.data['data'];

            if(data.imposto.length >= 1){
                data.imposto.forEach(function (imposto){
                    let valorImposto = parseFloat(getPercentage(data.produto.valor, imposto.valor));
                    let valorTotal = parseFloat(data.produto.valor);
                    let valorLiquido = valorTotal - valorImposto;
    
                    setTotalVenda(valorTotal + parseFloat(totalVenda));
                    setTotalImposto(valorImposto + parseFloat(totalImposto));

                    pedidos.push({
                        produto_id: data.produto.id,
                        produto_nome: data.produto.nome,
                        valor_imposto: valorImposto,
                        valor_liquido: valorLiquido
                    });
                });

            }else{
                let valorTotal = parseFloat(data.produto.valor);

                setTotalVenda(valorTotal + parseFloat(totalVenda));

                pedidos.push({
                    produto_id: data.produto.id,
                    produto_nome: data.produto.nome,
                    valor_imposto: 0,
                    valor_liquido: valorTotal
                });
            }           
        })
    }

    return(
        <div className="container-fluid p-3">
            <div className="row">
                <div className='col-md-12'>
                    <Alert variant={variant} show={alertElement} onClose={() => fecharAlerta()} dismissible>
                        {msgAlert}
                    </Alert>
                </div>
                <div className="col-md-12 text-right">
                    <div className="row">
                        <div className="col-md-6">
                            <h2>Vendas</h2>
                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-success" onClick={abrirModalAdicionar}>
                                Adicionar Venda
                            </button>
                        </div>
                    </div>
                    <hr/>
                </div>
                <div className="col-md-12" style={{height : '500px', overflow : 'auto'}}>
                    <table className='table' id="produtos">
                        <thead>
                            <tr>
                                <th scope="col">Código</th>
                                <th scope="col">Data Venda</th>
                                <th scope="col">Valor Total Venda</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendas.map((venda, key) => 
                                <tr key={key}>
                                    <td>{venda.id}</td>
                                    <td>{venda.created_at}</td>
                                    <td><CurrencyFormat value={venda.valor_total_venda ? String(venda.valor_total_venda) : 0} displayType={'text'} thousandSeparator={true} prefix={'R$ '} /></td>
                                    <td><button className="btn btn-primary" onClick={() => abrirModalItens(venda.id)}>Ver Itens</button></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal size="lg" show={modalItens} onHide={fecharModalItens}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Pedido Itens
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-12'>
                            <table class="table table-responsive">
                                <thead>
                                    <tr>
                                        <th>Produto</th>
                                        <th>Valor Líquido</th>
                                        <th>Valor Imposto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pedidoItens.map((pedido_item, key) => 
                                        <tr key={key}>
                                            <td>{pedido_item.nome}</td>
                                            <td><CurrencyFormat value={pedido_item.valor_liquido ? String(pedido_item.valor_liquido) : 0} displayType={'text'} thousandSeparator={true} prefix={'R$ '} /></td>
                                            <td><CurrencyFormat value={pedido_item.valor_imposto ? String(pedido_item.valor_imposto) : 0} displayType={'text'} thousandSeparator={true} prefix={'R$ '} /></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={fecharModalItens}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal size="lg" show={modalAdicionar} fullscreen={true}onHide={fecharModalAdicionar}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Adicionar venda
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-4'>
                            <label className='bolder'>Produto</label>
                            <select className="form-control" name="produto_id" id="produto_id" onChange={(e) => setProdutoSelecionado(e.target.value)}>
                                <option value="">Selecione...</option>
                                {produtos.map((produto, key) => 
                                    <option value={produto.id}> {produto.nome} </option>
                                )}
                            </select>                        
                        </div>
                        <div className='col-md-6' style={{marginTop: '22px'}}>
                            <button className="btn btn-success" onClick={adicionarItemVenda}>Adicionar produto</button>
                        </div>
                        <div className="col-md-12" style={{height: '350px', overflow: 'auto'}}>
                            <hr/>
                            <table class="table table-responsive">
                                <thead>
                                    <tr>
                                        <th>Order</th>
                                        <th>Produto</th>
                                        <th>Valor Líquido</th>
                                        <th>Valor Imposto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pedidos.map((pedido, key) => 
                                        <tr key={key}>
                                            <td>{key + 1}</td>
                                            <td>{pedido.produto_nome}</td>
                                            <td><CurrencyFormat value={pedido.valor_liquido ? String(pedido.valor_liquido) : 0} displayType={'text'} thousandSeparator={true} prefix={'R$ '} /></td>
                                            <td><CurrencyFormat value={pedido.valor_imposto ? String(pedido.valor_imposto) : 0} displayType={'text'} thousandSeparator={true} prefix={'R$ '} /></td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-12">
                            <hr/>
                        </div>
                        <div className="col-md-4">
                            <h3>Total Imposto: <span>R$ {totalImposto}</span></h3>
                        </div>
                        <div className="col-md-4">
                            <h3>Total Venda: <span>R$ {totalVenda}</span></h3>

                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={fecharModalAdicionar}>
                        Fechar
                    </Button>
                    <Button variant="success" onClick={adicionarVenda}>
                        Salvar venda
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Vendas;