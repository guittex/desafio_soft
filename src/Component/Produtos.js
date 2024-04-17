import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';


export default function Produtos() {
    const [produtos, setProdutos] =  useState([]);
    const [produtoNome, setProdutoNome] = useState();
    const [produtoValor, setProdutoValor] = useState();
    const [produtoID, setProdutoID] = useState();
    const [produtoTipoProdutoId, setProdutoTipoProdutoId] = useState();
    const [tipoProduto, setTipoProdutos] = useState([]);

    useEffect(()=>{
        listProdutos();
        listTipoProdutos();
    }, []);

    const listProdutos = () => {
        axios.get("http://localhost:8080/route.php?controller=ProdutoController&action=listProduto&key=chave-mestra").then(function (request){
            setProdutos(request.data['data']);            
        })
    }

    const listTipoProdutos = () => {
        axios.get("http://localhost:8080/route.php?controller=TipoProdutoController&action=listTipoProduto&key=chave-mestra").then(function (request){
            setTipoProdutos(request.data['data']);            
        })
    }

    const [show, setShow] = useState(false);

    const fecharModal = () => setShow(false);
    const abrirModal = () => {
        setProdutoNome("");
        setProdutoValor("");
        setProdutoTipoProdutoId("");
        setProdutoID("");
        setShow(true);
    };

    const [alertBox, closeAlert] = useState(false);

    const [msgAlert, setMsg] = useState();

    const [variant, setVariant] = useState();

    const adicionarProduto = (e) => {   
        if(produtoNome == "" || produtoValor == ""){
            alert("Preencha os dados antes de prosseguir");
            return;
        }

        const formData = new FormData();

        formData.append('nome', produtoNome);
        formData.append('valor', produtoValor);
        formData.append("tipo_produto_id", produtoTipoProdutoId)

        axios.post("http://localhost:8080/route.php?controller=ProdutoController&action=insertProduto&key=chave-mestra", formData).then(function (request){
            if(request.data['data']){
                setVariant('success');
                setMsg('Produto cadastrado com sucesso')

            }else{
                setVariant('danger');
                setMsg('Erro ao cadastrar produto')

            }
            
            closeAlert(true);
        });

        setShow(false);
        listProdutos();

        setTimeout(function() {
            closeAlert(false);
        }, 10000)
    }

    const [modalEdit, setModalEdit] = useState();

    const fecharModalEdit = () => setModalEdit(false);
    const abrirModalEdit = () => setModalEdit(true);

    const atualizaNomeProduto = (value) => {
        setProdutoNome(value);
    }

    const abrirEdicaoProduto = (id, nome, valor, tipo_produto_id) => {
        setProdutoNome(nome);
        setProdutoValor(valor);
        setProdutoID(id);
        setProdutoTipoProdutoId(tipo_produto_id);

        abrirModalEdit();
    }

    const editarProduto = () => {            
        if(produtoNome == "" || produtoValor == ""){
            alert("Preencha os dados antes de prosseguir");
            return;
        }
        
        const formDataEdit = new FormData();

        formDataEdit.append('nome', produtoNome);
        formDataEdit.append('valor', produtoValor);
        formDataEdit.append('id', produtoID);
        formDataEdit.append('tipo_produto_id', produtoTipoProdutoId);

        axios.post("http://localhost:8080/route.php?controller=ProdutoController&action=editProduto&key=chave-mestra", formDataEdit).then(function (request){
            if(request.data['data']){
                setVariant('success');
                setMsg('Produto editado com sucesso');

            }else{
                setVariant('danger');
                setMsg('Erro ao editar produto');

            }
            
            closeAlert(true);
        });

        fecharModalEdit();
        listProdutos();

        setTimeout(function() {
            closeAlert(false);
        }, 10000)
    }

    const atualizaValorProduto = (value) => {
        setProdutoValor(value);
    }

    const deletarProduto = (id) => {
        if(window.confirm("Tem certeza que deseja deletar este produto ?")) {
            const formDataDelete = new FormData();

            formDataDelete.append('id', id);

            axios.post("http://localhost:8080/route.php?controller=ProdutoController&action=deleteProduto&key=chave-mestra", formDataDelete).then(function (request){
                if(request.data['data']){
                    setVariant('success');
                    setMsg('Produto deletado com sucesso')

                }else{
                    setVariant('danger');
                    setMsg('Erro ao deletar produto')

                }

                closeAlert(true);
            });

            listProdutos();

            setTimeout(function() {
                closeAlert(false);
            }, 10000)
        }
    }

    return(
        <div className="container-fluid p-3">
            <div className="row">
                <div className='col-md-12'>
                    <Alert variant={variant} show={alertBox} onClose={() => closeAlert(false)} dismissible>
                        {msgAlert}
                    </Alert>
                </div>
                <div className="col-md-12 text-right">
                    <div className="row">
                        <div className="col-md-6">
                            <h2>Produtos</h2>
                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-success" onClick={abrirModal}>
                                Adicionar Produto
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
                                <th scope="col">Nome</th>
                                <th scope="col">Valor</th>
                                <th scope="col">Tipo Produto</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {produtos.map((produto, key) => 
                                <tr key={key}>
                                    <td>{produto.id}</td>
                                    <td>{produto.nome}</td>
                                    <td><CurrencyFormat value={produto.valor ? String(produto.valor) : 0} displayType={'text'} thousandSeparator={true} prefix={'R$ '} /></td>
                                    <td>{produto.tipo_produto}</td>
                                    <td>
                                        <button className='btn btn-warning' onClick={() => abrirEdicaoProduto(produto.id, produto.nome, produto.valor, produto.tipo_produto_id)}>Editar</button>
                                        <button class="btn btn-danger m-l-5" onClick={() => deletarProduto(produto.id)}>Deletar</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal size="lg" show={modalEdit} onHide={fecharModalEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Editar produto
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-12'>
                            <label className='bolder'>Nome:</label>
                            <input className='form-control' type="text" id="nome_edit" placeholder='Digite o nome do produto' onChange={e => atualizaNomeProduto(e.target.value)} value={produtoNome} name="nome"></input>
                        </div>
                        <div className='col-md-12 m-t-10'>
                            <label className='bolder'>Valor:</label>
                            <input  className='form-control' type="number" id="valor_edit" placeholder='Digite o valor do produto' onChange={e => atualizaValorProduto(e.target.value)} value={produtoValor} name="valor"/>
                        </div>
                        <div className='col-md-12 m-t-10'>
                            <label className='bolder'>Tipo de produto:</label>
                            <select className="form-control" name="tipo_produto_id" id="tipo-produto-id-add" onChange={e => setProdutoTipoProdutoId(e.target.value)}>
                                <option value="">Selecione...</option>
                                {tipoProduto.map((tipo_produto, key) => 
                                    <option value={tipo_produto.id}> {tipo_produto.nome} </option>
                                )}
                            </select>
                        </div>
                    </div>
                       
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={fecharModalEdit}>
                        Fechar
                    </Button>
                    <Button variant="success" onClick={editarProduto}>
                        Editar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal size="lg" show={show} onHide={fecharModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Adicionar produto
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-12'>
                            <label className='bolder'>Nome</label>
                            <input className='form-control' type="text" id="nome" onChange={e => atualizaNomeProduto(e.target.value)} placeholder='Digite o nome do produto' name="nome"></input>
                        </div>
                        <div className='col-md-12 m-t-10'>
                            <label className='bolder'>Valor:</label>
                            <input  className='form-control' type="number" id="valor" placeholder='Digite o valor do produto' onChange={e => atualizaValorProduto(e.target.value)} name="valor"/>
                        </div>
                        <div className='col-md-12 m-t-10'>
                            <label className='bolder'>Tipo de produto:</label>
                            <select className="form-control" name="tipo_produto_id" id="tipo-produto-id-add" onChange={e => setProdutoTipoProdutoId(e.target.value)}>
                                <option value="">Selecione...</option>
                                {tipoProduto.map((tipo_produto, key) => 
                                    <option value={tipo_produto.id}> {tipo_produto.nome} </option>
                                )}
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={fecharModal}>
                        Fechar
                    </Button>
                    <Button variant="success" onClick={adicionarProduto}>
                        Adicionar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
