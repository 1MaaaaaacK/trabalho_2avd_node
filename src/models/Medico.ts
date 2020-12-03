import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne, ManyToOne} from 'typeorm';
import Agendamento from './Agendamento'
@Entity('medico')

export default class Medico {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    especialidade: string;

    @OneToMany(() => Agendamento, agendamento => agendamento.MedicoID)
    @JoinColumn({name: 'id'})
    AgendamentoID: Agendamento;
}