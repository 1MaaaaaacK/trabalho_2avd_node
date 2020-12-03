import Pacientes from '../models/Pacientes'

export default {
  render(pacientes: Pacientes) {
    return {
    id: pacientes.id,
    name: pacientes.name,
    email: pacientes.email,
    telefone: pacientes.telefone,
    foto: `http://localhost:3333/uploads/${pacientes.foto}`
    };
  },

  renderMany(pacientes: Pacientes[]) {
    return pacientes.map(pacientes => this.render(pacientes));
  }

}