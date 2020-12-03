import { Request, Response} from 'express'; 
import { getConnection, getRepository } from 'typeorm';
import Pacientes_View from '../views/Pacientes_View';
import * as Yup from 'yup';

import Pacientes from '../models/Pacientes';

export default {
  async index(request: Request, response: Response){
    const medicosRepository = getRepository(Pacientes);

    return response.json(Pacientes_View.renderMany(await medicosRepository.find({
      select: ['name', 'email', 'id', 'telefone', 'foto']
  })))
  },

  async show(request: Request, response: Response) {
    const { id } = request.params

    const pacientesRepository = getRepository(Pacientes);

    return response.json(Pacientes_View.render(await pacientesRepository.findOneOrFail(id)))
  },

  async delete(request: Request, response: Response){
    const { id } = request.params;
    const pacientesRepository = getRepository(Pacientes);

    const pacientesCatch = await pacientesRepository.findOneOrFail(id);

    await pacientesRepository.delete(pacientesCatch)

    return response.json(Pacientes_View.render(pacientesCatch));
  }, 

  async create(request: Request, response: Response) {
      const {
        name,
        telefone,
        email,
      } = request.body

      const pacientesRepository = getRepository(Pacientes);

      const requestImages = request.files as Express.Multer.File[];
      const fotos = requestImages.map(image => {
        return image.filename
      }) 
      let foto = fotos[0]

      const data = {
        name,
        telefone, 
        email, 
        foto
      }
      const schema = Yup.object().shape({
        name: Yup.string().required('Voce deve preencher o campo name'),
        telefone: Yup.string().required('Voce deve preencher o campo telefone'),
        email: Yup.string().required('Voce deve preencher o campo email'),
        foto:  Yup.string().required('Voce deve preencher o campo foto')
      });

      await schema.validate(data, {
        abortEarly: false
      })
 
     

       const pacientes = pacientesRepository.create(data);
    
      await pacientesRepository.save(pacientes);
     
      return response.status(201).json(Pacientes_View.render(pacientes)); 
    },

    async alterar(request: Request, response: Response){

      const { id } = request.params;
  
     const pacientesRepository = getRepository(Pacientes);
  
    
  
     const {
       name,
       telefone,
       email,
     } = request.body
     
     const requestImages = request.files as Express.Multer.File[];
     const fotos = requestImages.map(image => {
       return image.filename
     }) 
     let foto = fotos[0]
  
     let data = {
       name,
       telefone,
       email,
       foto
     }
  let procura = await pacientesRepository.findOneOrFail(id)
   if(data.name == undefined){
     data.name = procura.name
  }
  if(data.telefone == undefined) {
   data.telefone = procura.telefone
  }
  if(data.email == undefined) {
   data.email = procura.email
  }
  if(data.foto == undefined) {
   data.foto = procura.foto
  }
  
      await getConnection() 
     .createQueryBuilder()
     .update(Pacientes)
     .set({ 
       name: data.name,
       telefone: data.telefone,
       email: data.email,
       foto: data.foto
     })
     .where(`id = ${id}`)
     .execute();  
     
     return response.json(Pacientes_View.render(await pacientesRepository.findOneOrFail(id)) ); 
   }, 
};
