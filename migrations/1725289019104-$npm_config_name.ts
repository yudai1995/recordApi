import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1725289019104 implements MigrationInterface {
    name = ' $npmConfigName1725289019104';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`record\` DROP COLUMN \`recordDate\``);
        await queryRunner.query(`ALTER TABLE \`record\` ADD \`recordDate\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`record\` DROP COLUMN \`recordDate\``);
        await queryRunner.query(`ALTER TABLE \`record\` ADD \`recordDate\` date NOT NULL`);
    }
}
