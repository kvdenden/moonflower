import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVaults1738860827381 implements MigrationInterface {
  name = 'CreateVaults1738860827381';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "vaults" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "address" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_487a5346fa3693a430b6d6db60c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "vaults" ADD CONSTRAINT "FK_1cfbcd8c3d3df510873ee00e12c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vaults" DROP CONSTRAINT "FK_1cfbcd8c3d3df510873ee00e12c"`,
    );
    await queryRunner.query(`DROP TABLE "vaults"`);
  }
}
