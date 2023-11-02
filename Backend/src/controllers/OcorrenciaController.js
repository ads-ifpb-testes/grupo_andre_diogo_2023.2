import {Ocorrencia} from '../model/Ocorrencia.js';

async function create({title, type, date, location, description}) {
    try {
        const novaOcorrencia = new Ocorrencia({
            title,
            type,
            date,
            location,
            description
        })
        await novaOcorrencia.save()
        return novaOcorrencia;
    } catch (error) {
        let err = new Error('Erro ao criar a ocorrência: ' + error.message);
        if(error.message.includes("violates not-null constraint")){
            err.status = 400;
        }
        throw err;
    }
}

async function findAll(){
    try{
        const ocorrencias = await Ocorrencia.find();
        return ocorrencias;
    } catch (error) {
        throw new Error('Erro ao resgatar as ocorrências: '+ error.message);
    }
}

async function findById(id) {
    try{
        const ocorrencia = await Ocorrencia.findById({_id: id});
        if(!ocorrencia){
            var err =new Error('Ocorrência não encontrada');
            err.status = 404;
            throw err;
        }
        return ocorrencia;
    } catch (error) {
        let err = new Error('Erro ao procurar a ocorrência: ' + error.message);
        err.status = error.status;
        throw err;
    }
}
async function update(id, novosDados, returnObj = false) {
    try{
        const modified = await Ocorrencia.updateOne({_id: id}, novosDados);
        if(returnObj){
            const ocorrencia = await Ocorrencia.findByPk(id);
            return ocorrencia;
        }
        return modified[0];
    } catch (error) {
        throw new Error(error.message);
    }
}
async function deleteById(id) {
    try{
        await Ocorrencia.deleteOne({_id: id});
    } catch (error) {
        throw new Error(error.message);
    }
}

export {create, findAll, findById, update, deleteById};