import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Alert } from 'react-bootstrap';


function TipoProdutos() {
    useEffect(()=>{
        listTipoProdutos();
    }, []);

    const [alertElement, setAlert] = useState(false);
    const [msgAlert, setMsg] = useState();
    const [variant, setVariant] = useState();
    const [modalAdicionar, setModalAdicionar] = useState(false);
    const [tipoProdutoNome, setTipoProdutoNome] = useState();
    const [tipoProdutoId, setTipoProdutoId] = useState();
    const [tipo_produtos, setTipoProdutos] =  useState([]);
    const [modalEditar, setModalEdit] = useState();

    const abrirModalAdicionar = () => {
        setTipoProdutoNome("");
        setModalAdicionar(true);
    }

    const fecharAlerta = () => {
        setAlert(false);
    }

    const fecharModalAdicionar = () => {
        setModalAdicionar(false);
    }

    const fecharModalEditar = () => {
        setModalEdit(false);
    }

    const atualizaNomeTipoProduto = (value) => {
        setTipoProdutoNome(value)
    }

    const adicionarTipoProduto = () => {
        if(tipoProdutoNome == ""){
            alert("Preencha os dados antes de prosseguir");
            return;
        }

        let formData = new FormData();

        formData.append('nome', tipoProdutoNome);

        axios.post("http://localhost:8080/route.php?controller=TipoProdutoController&action=insertTipoProduto&key=chave-mestra", formData).then(function (request){
            if(request.data['data']){
                setVariant('success');
                setMsg('Tipo de produto cadastrado com sucesso');

            }else{
                setVariant('danger');
                setMsg('Erro ao cadastrar tipo de produto');

            }

            setAlert(true);
            fecharModalAdicionar();
            listTipoProdutos();

            setTimeout(function() {
                setAlert(false);
            }, 10000)
        })
    }

    const listTipoProdutos = () => {
        axios.get("http://localhost:8080/route.php?controller=TipoProdutoController&action=listTipoProduto&key=chave-mestra").then(function (request){
            setTipoProdutos(request.data['data']);            
        })
    }

    const abrirEdicaoTipoProduto = (id, tipo_produto) => {
        setTipoProdutoNome(tipo_produto);
        setTipoProdutoId(id);
        setModalEdit(true);

    }

    const editarTipoProduto = () => {
        if(tipoProdutoNome == ""){
            alert("Preencha os dados antes de prosseguir");
            return;
        }

        let formData = new FormData();

        formData.append('nome', tipoProdutoNome);
        formData.append("id", tipoProdutoId);

        axios.post("http://localhost:8080/route.php?controller=TipoProdutoController&action=editTipoProduto&key=chave-mestra", formData).then(function (request){
            if(request.data['data']){
                setVariant('success');
                setMsg('Tipo de produto editado com sucesso');

            }else{
                setVariant('danger');
                setMsg('Erro ao editar tipo de produto');

            }

            setAlert(true);
            fecharModalEditar();
            listTipoProdutos();

            setTimeout(function() {
                setAlert(false);
            }, 10000)
        })
    }

    const deletarTipoProduto = (id) => {
        if(window.confirm("Tem certeza que deseja deletar este tipo de produto ?")) {
            let formData = new FormData();

            formData.append('id', id);

            axios.post("http://localhost:8080/route.php?controller=TipoProdutoController&action=deleteTipoProduto&key=chave-mestra", formData).then(function (request){
                if(request.data['data']){
                    setVariant('success');
                    setMsg('Tipo de produto deletado com sucesso')

                }else{
                    setVariant('danger');
                    setMsg('Erro ao deletar tipo de produto')

                }

                setAlert(true);
            });

            listTipoProdutos();

            setTimeout(function() {
                setAlert(false);
            }, 10000)
        }
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
                            <h2>Tipo de produtos</h2>
                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-success" onClick={abrirModalAdicionar}>
                                Adicionar Tipo de Produto
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
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tipo_produtos.map((tipo_produto, key) => 
                                <tr key={key}>
                                    <td>{tipo_produto.id}</td>
                                    <td>{tipo_produto.nome}</td>
                                    <td>
                                        <button className='btn btn-warning' onClick={() => abrirEdicaoTipoProduto(tipo_produto.id, tipo_produto.nome)}>Editar</button>
                                        <button class="btn btn-danger m-l-5" onClick={() => deletarTipoProduto(tipo_produto.id)}>Deletar</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal size="lg" show={modalEditar} onHide={fecharModalEditar}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Editar tipo de produto
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-12'>
                            <label className='bolder'>Nome</label>
                            <input className='form-control' type="text" id="nome" onChange={e => atualizaNomeTipoProduto(e.target.value)} placeholder='Digite o nome do tipo de produto' name="nome" value={tipoProdutoNome}></input>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={fecharModalEditar}>
                        Fechar
                    </Button>
                    <Button variant="success" onClick={editarTipoProduto}>
                        Editar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal size="lg" show={modalAdicionar} onHide={fecharModalAdicionar}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Adicionar tipo de produto
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-12'>
                            <label className='bolder'>Nome</label>
                            <input className='form-control' type="text" id="nome" onChange={e => atualizaNomeTipoProduto(e.target.value)} placeholder='Digite o nome do tipo de produto' name="nome"></input>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={fecharModalAdicionar}>
                        Fechar
                    </Button>
                    <Button variant="success" onClick={adicionarTipoProduto}>
                        Adicionar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default TipoProdutos;