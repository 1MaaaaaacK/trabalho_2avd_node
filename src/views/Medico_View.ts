import Medico from '../models/Medico'

export default {
  render(medico: Medico) {
    return {
    id: medico.id,
    name: medico.name,
    especialidade: medico.especialidade
    };
  },

  renderMany(medico: Medico[]) {
    return medico.map(medico => this.render(medico));
  }

}