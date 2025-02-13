import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVaults1739443827289 implements MigrationInterface {
  name = 'CreateVaults1739443827289';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "agent_wallets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "address" character varying NOT NULL, "approval" character varying, "vaultId" uuid, CONSTRAINT "REL_251d58d412e8b84492b2823b65" UNIQUE ("vaultId"), CONSTRAINT "PK_a39561da06e06e413f2a4d20639" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "vaults" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "index" integer NOT NULL DEFAULT '0', "address" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_487a5346fa3693a430b6d6db60c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "agent_wallets" ADD CONSTRAINT "FK_251d58d412e8b84492b2823b658" FOREIGN KEY ("vaultId") REFERENCES "vaults"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "vaults" ADD CONSTRAINT "FK_1cfbcd8c3d3df510873ee00e12c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "vaults" DROP CONSTRAINT "FK_1cfbcd8c3d3df510873ee00e12c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "agent_wallets" DROP CONSTRAINT "FK_251d58d412e8b84492b2823b658"`,
    );
    await queryRunner.query(`DROP TABLE "vaults"`);
    await queryRunner.query(`DROP TABLE "agent_wallets"`);
  }
}
