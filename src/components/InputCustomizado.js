import React, {Component} from 'react'
import PubSub from 'pubsub-js';

export default class InputCustomizado extends Component{

    constructor(){
        super();
        this.state = {msgErro:''};
    }

    componentDidMount(){
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
                <input {...this.props}/>
                <span>{this.state.msgErro}</span>                  
            </div>
        )

        
    }
    
}