import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, Timestamp, ManyToOne} from 'typeorm';
import Medico from './Medico'
import Pacientes from './Pacientes'
@Entity('agendamento')

export default class Agendamento {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    data_consulta: string;

    @Column()
    horario_consulta: string;

    @Column()
    id_medico: number;

    @Column()
    id_pacientes: number;

    @ManyToOne(() => Medico, medico => medico.AgendamentoID)
    @JoinColumn({name: 'id_medico'})
    MedicoID: Medico;

    @ManyToOne(() => Pacientes, pacientes => pacientes.AgendamentoID2)
    @JoinColumn({name: 'id_pacientes'})
    PacientesID: Pacientes;

}