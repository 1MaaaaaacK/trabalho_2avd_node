import { Router } from 'express';
import multer from 'multer'

import uploadConfig from './config/upload'
import MedicoController from './controllers/Medico_Controller'
import PacientesController from './controllers/Pacientes_Controller'
import AgendamentoController from './controllers/Agendamento_Controller' 

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/medicos', MedicoController.index);
routes.get('/medicos/:id', MedicoController.show);
routes.post('/medicos', MedicoController.create);
routes.delete('/medicos/:id', MedicoController.delete);

routes.get('/pacientes', PacientesController.index);
routes.get('/pacientes/:id', PacientesController.show);
routes.post('/pacientes', upload.array('foto'), PacientesController.create);
routes.delete('/pacientes/:id', PacientesController.delete);
routes.put('/pacientes/:id', upload.array('foto'), PacientesController.alterar); 

routes.get('/agendamento', AgendamentoController.index);
 routes.get('/agendamento/:id', AgendamentoController.show);
routes.post('/agendamento', upload.array('foto'), AgendamentoController.create);
routes.delete('/agendamento/:id', AgendamentoController.delete);
routes.put('/agendamento/:id', upload.array('foto'), AgendamentoController.alterar); 
 


export default routes;
