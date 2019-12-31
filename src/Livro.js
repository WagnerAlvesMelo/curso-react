import React, {Component} from 'react';
import PubSub from 'pubsub-js'
import InputCustomizado from './components/InputCustomizado'
import TrataErros from './TrataErros';

class FormularioLivro extends Component{
    constructor(){
        super();
        this.state = ({titulo: '', preco:'', autorId:'', autores:[]});
        this.setTitulo = this.setTitulo.bind(this);
        this.setPreco = this.setPreco.bind(this);
        this.setAutor = this.setAutor.bind(this);
    }

    setTitulo(evento){
        this.setState({titulo:evento.target.value})
    }

    setPreco(evento){
        this.setState({preco:evento.target.value})
    }

    setAutor(evento){
        this.setState({autorId:evento.target.value})
    }

    componentWillMount(){
        fetch('http://cdc-react.herokuapp.com/api/autores')
        .then((response) =>
            response.json()
            .then((resultado) =>{
                if(response.ok)
                    this.setState({autores:resultado});
            })
        )
       
    }

    cadastraLivro = (evento) =>{
        PubSub.publish("limpa-campos",{});
        evento.preventDefault();
        fetch('http://cdc-react.herokuapp.com/api/livros',{
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                titulo:this.state.titulo, preco: this.state.preco, autorId: this.state.autorId
            })
        }).then((response) =>
            response.json()

            .then((resultado)=>{
                if(response.ok){
                    this.setState({titulo:'', preco:'', autorId:''})
                    PubSub.publish('atualiza-listagem-livros',resultado)
                    
                }else{
                    let trataErros = new TrataErros();
                    trataErros.recebeErro(resultado);
                }
            })
        )}
    
    render(){
        return(
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.cadastraLivro}>
                    <InputCustomizado id="titulo" type="text" name="titulo" label="Titulo" value={this.state.titulo} onChange={this.setTitulo}/>
                    <InputCustomizado id="preco" type="number" name="preco" label="Preco" value={this.state.preco} onChange={this.setPreco}/>
                    <div className="pure-control-group">
                    <label htmlFor="autorId">Autor</label> 
                        <select value={this.state.autorId} name="autorId" onChange={this.setAutor}>
                        <option value="">Selecione um autor</option>
                            {
                                this.state.autores.map(autor=>{
                                    return (
                                        <option key={autor.id} value={autor.id}>{autor.nome}</option>
                                    )
                                })
                                    
                                }
                            }
                        </select>
                    </div>
                    <div className="pure-control-group">
                        <label></label> 
                        <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                    </div>
                </form>
            </div>
        )
    }
}

class TabelaLivros extends Component{

    constructor(){
        super();
        this.state = ({lista:[]});
    }

    componentDidMount(){
        fetch('http://cdc-react.herokuapp.com/api/livros')
        .then(response => response.json()
            .then(resultado =>{
                if(response.ok)
                    this.setState({lista:resultado});
                    
            })
        )
        PubSub.subscribe('atualiza-listagem-livros',(topico,resultado)=>{
            this.setState({lista:resultado});
        })
    }



    render(){
        return(
            <div>        
                <table className="pure-table">
                    <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Preço</th>
                        <th>Autor</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.lista.map(dados=>{
                            return (
                                <tr key={dados.id}>
                                    <td>{dados.titulo}</td>
                                    <td>{dados.preco}</td>                                    
                                    <td>{dados.autor.nome}</td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </table> 
            </div> 
        )
    }

}

export default class LivroBox extends Component{
    
    render(){
        return(
            <div>
                <div className="header">
                    <h1>Cadastro de livros</h1>
                </div>
                <FormularioLivro/>
                <TabelaLivros/>
            </div>
        )
    }
}