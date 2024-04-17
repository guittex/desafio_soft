import logo from './logo.svg';
import './App.css';
import { useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import Header from './Component/Header';
import Dashboard from './Component/Dashboard';
import Footer from './Component/Footer';
import Produtos from './Component/Produtos';
import Vendas from './Component/Vendas';
import TipoProdutos from './Component/TipoProdutos';
import Impostos from './Component/Impostos';

function App() {

  return (
    <div className="App">  
        <Header/>
        <Routes>
            <Route path="/" element={ <Dashboard/> } />
            <Route path="/produtos" element={ <Produtos/> } />
            <Route path="/vendas" element={ <Vendas/> } />
            <Route path="/tipo-produtos" element={ <TipoProdutos/> } />
            <Route path="/impostos" element={ <Impostos/> } />
        </Routes>
        <Footer/>
    </div>
  );
}

export default App;
