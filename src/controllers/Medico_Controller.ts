import { Request, Response} from 'express'; 
import { getConnection, getRepository } from 'typeorm';
import Medico_View from '../views/Medico_View';
import * as Yup from 'yup';

import Medico from '../models/Medico';

export default {
  async index(request: Request, response: Response){
    const medicosRepository = getRepository(Medico);

    return response.json(Medico_View.renderMany(await medicosRepository.find({
      select: ['name', 'especialidade', 'id']
  })))
  },

  async show(request: Request, response: Response) {
    const { id } = request.params

    const medicosRepository = getRepository(Medico);

    return response.json(Medico_View.render(await medicosRepository.findOneOrFail(id)))
  },

  async delete(request: Request, response: Response){
    const { id } = request.params;
    const medicosRepository = getRepository(Medico);

    const medicosCatch = await medicosRepository.findOneOrFail(id);

    await medicosRepository.delete(medicosCatch)

    return response.json(Medico_View.render(medicosCatch));
  }, 

  async create(request: Request, response: Response) {
      const {
        name,
        especialidade,
      } = request.body

      const medicosRepository = getRepository(Medico);

      const data = {
        name,
        especialidade
      }
      const schema = Yup.object().shape({
        name: Yup.string().required('Voce deve preencher o campo name'),
        especialidade: Yup.string().required('Voce deve preencher o campo especialidade'),  
      });

      await schema.validate(data, {
        abortEarly: false
      })
 
     
       const medico = medicosRepository.create(data);
    
      await medicosRepository.save(medico);
     
      return response.status(201).json(Medico_View.render(medico)); 
    }
};
