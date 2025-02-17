import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWorkflows1739781949495 implements MigrationInterface {
  name = 'CreateWorkflows1739781949495';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "workflows" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "vaultId" uuid, CONSTRAINT "PK_5b5757cc1cd86268019fef52e0c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "workflows" ADD CONSTRAINT "FK_d719d95f4a98386afab169a6a58" FOREIGN KEY ("vaultId") REFERENCES "vaults"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "workflows" DROP CONSTRAINT "FK_d719d95f4a98386afab169a6a58"`,
    );
    await queryRunner.query(`DROP TABLE "workflows"`);
  }
}
