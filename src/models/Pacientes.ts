import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne} from 'typeorm';
import Agendamento from './Agendamento'
@Entity('pacientes')

export default class Pacientes {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;
    
    @Column()
    telefone: string;

    @Column()
    foto: string;
    
    @OneToMany(() => Agendamento, agendamento => agendamento.PacientesID)
    @JoinColumn({name: 'id'})
    AgendamentoID2: string;

}