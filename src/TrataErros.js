import PubSub from 'pubsub-js';

class TrataErros{
    
    recebeErro(erros){
        erros.errors.forEach(erro => {
            PubSub.publish('erro-campos', erro);
        });
    }

}

export default TrataErros;