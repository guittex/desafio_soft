import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Alert } from 'react-bootstrap';

function Impostos() {
    useEffect(()=>{
        listImpostos();
        listTipoProdutos();
    }, []);

    const [alertElement, setAlert] = useState(false);
    const [msgAlert, setMsg] = useState();
    const [variant, setVariant] = useState();
    const [modalAdicionar, setModalAdicionar] = useState(false);
    const [valorImposto, setValorImposto] = useState();
    const [idImposto, setIdImposto] = useState();
    const [nomeImposto, setNomeImposto] = useState();
    const [impostos, setImpostos] =  useState([]);
    const [modalEditar, setModalEdit] = useState();
    const [tipoProduto, setTipoProdutos] = useState([]);
    const [tipoProdutoIdImposto, setTipoProdutoId] = useState([]);

    const arrayTipoProdutoId = (e) => {
        setTipoProdutoId([]);

        var options = e.target.options;
        var array = [];

        for (var i = 0, l = options.length; i < l; i++) {
          if (options[i].selected) {
            array.push(options[i].value);
          }
        }

        setTipoProdutoId(array);
    }

    const listImpostos = () => {
        axios.get("http://localhost:8080/route.php?controller=ImpostoController&action=listImpostos&key=chave-mestra").then(function (request){
            setImpostos(request.data['data']);           
        })
    }

    const listTipoProdutos = () => {
        axios.get("http://localhost:8080/route.php?controller=TipoProdutoController&action=listTipoProduto&key=chave-mestra").then(function (request){
            setTipoProdutos(request.data['data']);            
        })
    }

    const abrirModalAdicionar = () => {
        setValorImposto("");
        setNomeImposto("");
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

    const abrirEdicaoImposto = (id, nome, valor) => {
        setIdImposto(id);
        setNomeImposto(nome);
        setValorImposto(parseFloat(valor));
        setModalEdit(true);

    }

    const deletarImposto = (id) => {
      
    }

    const editarImposto = () => {
        if(valorImposto == "" || nomeImposto == ""){
            alert("Preencha os dados antes de prosseguir");
            return;
        }

        let formData = new FormData();

        formData.append('nome', nomeImposto);
        formData.append('valor', valorImposto);
        formData.append("tipo_produto_id", tipoProdutoIdImposto);
        formData.append("id", idImposto);

        axios.post("http://localhost:8080/route.php?controller=ImpostoController&action=editImposto&key=chave-mestra", formData).then(function (request){
            if(request.data['data']){
                setVariant('success');
                setMsg('Imposto editado com sucesso');

            }else{
                setVariant('danger');
                setMsg('Erro ao editar imposto');

            }

            setAlert(true);
            fecharModalEditar();
            listImpostos();

            setTimeout(function() {
                setAlert(false);
            }, 10000)
        })
    }
    

    const adicionarImposto = () => {
        if(valorImposto == "" || nomeImposto == ""){
            alert("Preencha os dados antes de prosseguir");
            return;
        }

        let formData = new FormData();

        formData.append('nome', nomeImposto);
        formData.append('valor', valorImposto);
        formData.append("tipo_produto_id", tipoProdutoIdImposto);

        axios.post("http://localhost:8080/route.php?controller=ImpostoController&action=insertImposto&key=chave-mestra", formData).then(function (request){
            if(request.data['data']){
                setVariant('success');
                setMsg('Imposto cadastrado com sucesso');

            }else{
                setVariant('danger');
                setMsg('Erro ao cadastrar imposto');

            }

            setAlert(true);
            fecharModalAdicionar();
            listImpostos();

            setTimeout(function() {
                setAlert(false);
            }, 10000)
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
                            <h2>Impostos</h2>
                        </div>
                        <div className="col-md-6">
                            <button className="btn btn-success" onClick={abrirModalAdicionar}>
                                Adicionar Imposto
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
                                <th scope="col">Tipo de Produto</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {impostos.map((imposto, key) => 
                                <tr key={key}>
                                    <td>{imposto.id}</td>
                                    <td>{imposto.nome}</td>
                                    <td>{parseFloat(imposto.valor)} %</td>
                                    <td>{imposto.tipo_produtos_nomes}
                                    </td>
                                    <td>
                                        <button className='btn btn-warning' onClick={() => abrirEdicaoImposto(imposto.id, imposto.nome, imposto.valor)}>Editar</button>
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
                            <input className='form-control' type="text" id="nome" onChange={e => setNomeImposto(e.target.value)} placeholder='Digite o nome do imposto' name="nome" value={nomeImposto}></input>
                        </div>
                        <div className='col-md-12 m-t-10'>
                            <label className='bolder'>Valor</label>
                            <input className='form-control' type="number" id="imposto-valor" onChange={e => setValorImposto(e.target.value)} placeholder='Digite o valor do imposto' name="valor" value={valorImposto}></input>
                        </div>
                        <div className='col-md-12 m-t-10'>
                            <label className='bolder'>Tipo de produto:</label>
                            <select className="form-control" name="tipo_produto_id" id="tipo-produto-id-add" multiple="multiple" onChange={e => arrayTipoProdutoId(e)}>
                                <option value="">Selecione...</option>
                                {tipoProduto.map((tipo_produto, key) => 
                                    <option value={tipo_produto.id}> {tipo_produto.nome} </option>
                                )}
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={fecharModalEditar}>
                        Fechar
                    </Button>
                    <Button variant="success" onClick={editarImposto}>
                        Editar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal size="lg" show={modalAdicionar} onHide={fecharModalAdicionar}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Adicionar imposto
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        <div className='col-md-12'>
                            <label className='bolder'>Nome</label>
                            <input className='form-control' type="text" id="imposto-nome" onChange={e => setNomeImposto(e.target.value)} placeholder='Digite o nome do imposto' name="nome"></input>
                        </div>
                        <div className='col-md-12 m-t-10'>
                            <label className='bolder'>Valor</label>
                            <input className='form-control' type="number" id="imposto-valor" onChange={e => setValorImposto(e.target.value)} placeholder='Digite o valor do imposto' name="valor"></input>
                        </div>
                        <div className='col-md-12 m-t-10'>
                            <label className='bolder'>Tipo de produto:</label>
                            <select className="form-control" name="tipo_produto_id" id="tipo-produto-id-add" multiple="multiple" onChange={e => arrayTipoProdutoId(e)}>
                                <option value="">Selecione...</option>
                                {tipoProduto.map((tipo_produto, key) => 
                                    <option value={tipo_produto.id}> {tipo_produto.nome} </option>
                                )}
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={fecharModalAdicionar}>
                        Fechar
                    </Button>
                    <Button variant="success" onClick={adicionarImposto}>
                        Adicionar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Impostos;