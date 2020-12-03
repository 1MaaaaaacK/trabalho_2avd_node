import { MigrationInterface, QueryRunner, Table, Unique } from "typeorm";

export class CriarAgendamento1606780174038 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'agendamento',
      columns: [
        {
        name: 'id',
        type: 'integer',
        unsigned: true,
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment'
      },
        {
          name: 'data_consulta',
          type: 'varchar',
        },
        {
          name: 'horario_consulta',
          type: 'varchar'
        },
        {
          name: 'id_medico',
          type: 'integer',
        },
        {
          name: 'id_pacientes',
          type: 'integer',
        },
      ],
      foreignKeys: [
        {
          name: 'Medico',
          columnNames: ['id_medico'],
          referencedTableName: 'medico',
          referencedColumnNames: ['id']

        },
        {
          name: 'Pacientes',
          columnNames: ['id_pacientes'],
          referencedTableName: 'pacientes',
          referencedColumnNames: ['id']
        },
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('agendamento')
  }

}
