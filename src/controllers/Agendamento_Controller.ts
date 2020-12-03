import { Request, Response} from 'express'; 
import { getConnection, getRepository } from 'typeorm';
import Pacientes_View from '../views/Pacientes_View';
import * as Yup from 'yup';

import Agendamento from '../models/Agendamento';
import Pacientes from '../models/Pacientes';
import Medico from '../models/Medico';
import Agendamento_View from '../views/Agendamento_View';
import Medico_View from '../views/Medico_View';


export default {
  async index(request: Request, response: Response){

    const agendamentoRepository = getRepository(Agendamento);
   const AgendamentoCatch = Agendamento_View.renderMany(await agendamentoRepository.find({
    select: ['id', 'horario_consulta', 'id_medico', 'id_pacientes']
}))

  const pacientesRepository = getRepository(Pacientes);
  const medicoRepository = getRepository(Medico);

  let resultado: Array<object> = []

  for(let i in AgendamentoCatch){
    let medico = Medico_View.render(await medicoRepository.findOneOrFail(AgendamentoCatch[i].id_medico))
    let pacientes = Pacientes_View.render(await pacientesRepository.findOneOrFail(AgendamentoCatch[i].id_pacientes))

    resultado[i] = {
      id_consulta: AgendamentoCatch[i].id,
      nome_paciente: pacientes.name,
      telefone_pacientes: pacientes.telefone,
      foto_pacientes: pacientes.foto,
      nome_medico: medico.name,
      especialidade_medico: medico.especialidade,
      horario_consulta: AgendamentoCatch[i].horario_consulta
    } 
  }
    

     return response.json(resultado)
 
  },

   async show(request: Request, response: Response) {
    const { id } = request.params

    const agendamentoRepository = getRepository(Agendamento);

    const AgendamentoCatch = Agendamento_View.render(await agendamentoRepository.findOneOrFail(id))
 
   const pacientesRepository = getRepository(Pacientes);
   const medicoRepository = getRepository(Medico);
 
   let resultado: Array<object> = []
 
   
     let medico = Medico_View.render(await medicoRepository.findOneOrFail(AgendamentoCatch.id_medico))
     let pacientes = Pacientes_View.render(await pacientesRepository.findOneOrFail(AgendamentoCatch.id_pacientes))
 
     resultado[0] = {
       id_consulta: AgendamentoCatch.id,
       nome_paciente: pacientes.name,
       telefone_pacientes: pacientes.telefone,
       foto_pacientes: pacientes.foto,
       nome_medico: medico.name,
       especialidade_medico: medico.especialidade,
       horario_consulta: AgendamentoCatch.horario_consulta
     } 
   
     
 
      return response.json(resultado)
  },

  async delete(request: Request, response: Response){
    const { id } = request.params;
    const agendamentoRepository = getRepository(Agendamento);

    const agendamentoCatch = await agendamentoRepository.findOneOrFail(id);

    await agendamentoRepository.delete(agendamentoCatch)

    return response.json(Agendamento_View.render(agendamentoCatch));
  }, 

  async create(request: Request, response: Response) {
      const {
        data_consulta,
        horario_consulta,
        id_medico,
        id_pacientes 
      } = request.body
      const agendamentoRepository = getRepository(Agendamento);
     
    const pacienteRepository = getRepository(Pacientes);

 const foto = Pacientes_View.render(await pacienteRepository.findOneOrFail(id_pacientes, {select: ['foto']}))


      const data = {
        data_consulta,
        horario_consulta,
        id_medico,
        id_pacientes
      }
      const dataShow = {
        data_consulta,
        horario_consulta,
        id_medico,
        id_pacientes,
        foto
      }
      const schema = Yup.object().shape({
        data_consulta: Yup.string().required('Voce deve preencher o campo name'),
        horario_consulta: Yup.string().required('Voce deve preencher o campo telefone'),
        id_medico: Yup.string().required('Voce deve preencher o campo email'),
        id_pacientes: Yup.string().required('Voce deve preencher o campo email'),
      });

      await schema.validate(data, {
        abortEarly: false
      })
 
      
       const agendamentos = agendamentoRepository.create(data);
    
      await agendamentoRepository.save(agendamentos);
     
      return response.status(201).json(dataShow);
    },

     async alterar(request: Request, response: Response){

      const { id } = request.params;
  
     const agendamentoRepository = getRepository(Agendamento);
  
    
  
     const {
      data_consulta,
      horario_consulta,
      id_medico,
      id_pacientes
     } = request.body
     
  
     let data = {
      data_consulta,
      horario_consulta,
      id_medico,
      id_pacientes
     }


  let procura = await agendamentoRepository.findOneOrFail(id)
   if(data.data_consulta == undefined){
     data.data_consulta = procura.data_consulta
  }
  if(data.horario_consulta == undefined) {
   data.horario_consulta = procura.horario_consulta
  }
  if(data.id_medico == undefined) {
   data.id_medico = procura.id_medico
  }
  if(data.id_pacientes == undefined) {
   data.id_pacientes = procura.id_pacientes
  }
  
      await getConnection() 
     .createQueryBuilder()
     .update(Agendamento)
     .set({ 
      data_consulta: data.data_consulta,
      horario_consulta: data.horario_consulta,
      id_medico: data.id_medico,
      id_pacientes: data.id_pacientes,

     })
     .where(`id = ${id}`)
     .execute();  
     
     return response.json(Agendamento_View.render(await agendamentoRepository.findOneOrFail(id)) ); 
   },   
};
