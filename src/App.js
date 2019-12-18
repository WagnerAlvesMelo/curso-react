import React, {Component} from 'react';
import './App.css';
import InputCustomizado from './components/InputCustomizado';

class App extends Component {
	constructor(){
		super();
		this.state = {lista:[], nome:'', email:'', senha:''};
		this.cadastraForm	= this.cadastraForm.bind(this);
		this.setNome 		= this.setNome.bind(this);
		this.setEmail 		= this.setEmail.bind(this);
		this.setSenha		= this.setSenha.bind(this);
	};
	componentDidMount(){
		fetch('http://cdc-react.herokuapp.com/api/autores')
		.then(response => response.json())
		.then((data)=>{
			this.setState({lista:data})
		})
	}

	cadastraForm(evento){
		evento.preventDefault();
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
				this.setState({lista:resultado});
			})
		})
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

	render() {
		return (
			<div id="layout">
				<a href="#menu" id="menuLink" className="menu-link">
		
					<span></span>
					
				</a>
		
				<div id="menu">
					<div className="pure-menu">
						<a className="pure-menu-heading" href="#">Company</a>
			
						<ul className="pure-menu-list">
							<li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
							<li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
							<li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>
			
			
						</ul>
					</div>
				</div>
			
				<div id="main">
					<div className="header">
						<h1>Cadastro de Autores</h1>
					</div>
					<div className="content" id="content">
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
								this.state.lista.map(dados=>{
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
					</div>
				</div>            
			</div>     
		);
	}
}


export default App;
