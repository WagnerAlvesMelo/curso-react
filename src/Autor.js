import React,{Component} from 'react';
import InputCustomizado from './components/InputCustomizado';
import PubSub from 'pubsub-js';
import TrataErros from './TrataErros';

class FormularioAutor extends Component{
    constructor(){
        super();
        this.state = {nome:'', email:'', senha:''}
        this.cadastraForm	= this.cadastraForm.bind(this);
		this.setNome 		= this.setNome.bind(this);
		this.setEmail 		= this.setEmail.bind(this);
		this.setSenha		= this.setSenha.bind(this);
    }

    cadastraForm(evento){
        evento.preventDefault();

        PubSub.publish('limpa-campos',{});

		fetch('http://cdc-react.herokuapp.com/api/autores',{
			method:'POST',
			headers:{
				"Content-Type" : "application/json"	
			},
			body: JSON.stringify({
				nome:this.state.nome, email: this.state.email, senha: this.state.senha
			})
		}).then((response)=>{
            response.json()
            
			.then((resultado)=>{

                if(resultado.ok){
                    PubSub.publish('novo-registro-adicionado',resultado);
                    this.setState({nome:'', email:'', senha:''})
                }
                else{
                    var erros = new TrataErros();
                    erros.recebeErro(resultado);
                }
            });
        }).catch((erro)=>{
            console.log(erro);
        });
        
	}

	setNome(evento){
		this.setState({nome:evento.target.value})
	}

	setEmail(evento){
		this.setState({email:evento.target.value})
	}

	setSenha(evento){
		this.setState({senha:evento.target.value})
	}

    render(){
        return(
            <div className="pure-form pure-form-aligned">
            <form className="pure-form pure-form-aligned" onSubmit={this.cadastraForm}>
                <InputCustomizado id="nome" label="Nome" type="text" name="nome" value={this.state.nome} onChange={this.setNome}/>
                <InputCustomizado id="email" label="Email" type="email" name="email" value={this.state.email} onChange={this.setEmail}/>
                <InputCustomizado id="senha" label="Senha" type="password" name="senha" value={this.state.senha} onChange={this.setSenha}/>
                <div className="pure-control-group">
                    <label></label> 
                    <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                </div>
            </form>             

            </div>
        );
    }
}

class TabelaAutores extends Component{

    render(){
        return(
            <div>            
                <table className="pure-table">
                    <thead>
                    <tr>
                        <th>Nome</th>
                        <th>email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.lista.map(dados=>{
                            return (
                                <tr key={dados.id}>
                                    <td>{dados.nome}</td>
                                    <td>{dados.email}</td>
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

export default class AutorBox extends Component{

    constructor() {
        super();
        this.state = {lista : []};
    }

	componentDidMount(){
		fetch('http://cdc-react.herokuapp.com/api/autores')
		.then(response => response.json())
		.then((resposta)=>{
			this.setState({lista:resposta});
        })

        PubSub.subscribe('novo-registro-adicionado',(topico,resposta)=>{
            this.setState({lista:resposta});
        })
    }
    
    render(){
        return(
            <div>
                <FormularioAutor/>
                <TabelaAutores lista={this.state.lista}/>
            </div>
        );
    }
}