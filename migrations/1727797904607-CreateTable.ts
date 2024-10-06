import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTable1727797904607 implements MigrationInterface {
    name = 'CreateTable1727797904607';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT COMMENT 'カテゴリID', \`category\` int NOT NULL COMMENT 'カテゴリ', \`categoryName\` varchar(50) NOT NULL COMMENT 'カテゴリ名', \`createDate\` datetime(6) NOT NULL COMMENT '作成日時' DEFAULT CURRENT_TIMESTAMP(6), \`lastUpdate\` datetime(6) NOT NULL COMMENT '最終更新日時' DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_cb776c7d842f8375b60273320d\` (\`categoryName\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_cb776c7d842f8375b60273320d\` ON \`category\``);
        await queryRunner.query(`DROP TABLE \`category\``);
    }
}
