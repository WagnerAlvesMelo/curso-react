import React, {Component} from 'react'
import PubSub from 'pubsub-js';

export default class InputCustomizado extends Component{

    constructor(){
        super();
        this.state = {msgErro:''};
    }

    componentWillMount(){
        PubSub.subscribe("limpa-campos",()=>{
            this.setState({msgErro:''});
        });
        
        PubSub.subscribe('erro-campos',(topico, elemento)=>{
            if(elemento.field === this.props.name){
                this.setState({msgErro:elemento.defaultMessage})
            }
        });


    }

    render(){
        return(
            <div className="pure-control-group">
                <label htmlFor={this.props.id}>{this.props.label}</label> 
                <input id={this.props.id} type={this.props.type} name={this.props.name} value={this.props.value} onChange={this.props.onChange}  />
                <span>{this.state.msgErro}</span>                  
            </div>
        )

        
    }
    
}