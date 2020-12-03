import Agendamento from '../models/Agendamento'

export default {
  render(agendamento: Agendamento) {
    return {
    id: agendamento.id,
    data_consulta: agendamento.data_consulta,
    horario_consulta: agendamento.horario_consulta,
    id_medico: agendamento.id_medico,
    id_pacientes: agendamento.id_pacientes,
    };
  },

  renderMany(agendamento: Agendamento[]) {
    return agendamento.map(agendamento => this.render(agendamento));
  }

}