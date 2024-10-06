import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCategory1727971269711 implements MigrationInterface {
    name = 'UpdateCategory1727971269711';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`category\` CHANGE \`id\` \`id\` int NOT NULL COMMENT 'カテゴリID'`);
        await queryRunner.query(`ALTER TABLE \`category\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`id\``);
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`category\``);
        await queryRunner.query(
            `ALTER TABLE \`category\` ADD \`categoryId\` int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'カテゴリID'`,
        );
        await queryRunner.query(`ALTER TABLE \`record\` DROP COLUMN \`recordDate\``);
        await queryRunner.query(`ALTER TABLE \`record\` ADD \`recordDate\` date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`record\` DROP COLUMN \`recordDate\``);
        await queryRunner.query(`ALTER TABLE \`record\` ADD \`recordDate\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`category\` DROP COLUMN \`categoryId\``);
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`category\` int NOT NULL COMMENT 'カテゴリ'`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD \`id\` int NOT NULL AUTO_INCREMENT COMMENT 'カテゴリID'`);
        await queryRunner.query(`ALTER TABLE \`category\` ADD PRIMARY KEY (\`id\`)`);
        await queryRunner.query(
            `ALTER TABLE \`category\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT COMMENT 'カテゴリID'`,
        );
    }
}
