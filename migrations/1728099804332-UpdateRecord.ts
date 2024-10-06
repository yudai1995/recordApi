import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRecord1728099804332 implements MigrationInterface {
    name = 'UpdateRecord1728099804332';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`record\` CHANGE \`category\` \`categoryId\` int NOT NULL COMMENT 'カテゴリ'`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE \`record\` CHANGE \`categoryId\` \`category\` int NOT NULL COMMENT 'カテゴリ'`,
        );
    }
}
