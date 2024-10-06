import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRecord1697023113575 implements MigrationInterface {
    name = 'CreateRecord1697023113575';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`record\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'レコードID', \`category\` int NOT NULL COMMENT 'カテゴリ', \`title\` varchar(255) NOT NULL COMMENT 'タイトル', \`recordDate\` date NOT NULL, \`lastUpdate\` datetime(6) NOT NULL COMMENT '最終更新日時' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`record\``);
    }
}
