import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAgentWallets1739183437697 implements MigrationInterface {
  name = 'CreateAgentWallets1739183437697';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "agent_wallets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "address" character varying NOT NULL, "approval" character varying NOT NULL, CONSTRAINT "PK_a39561da06e06e413f2a4d20639" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "agent_wallets"`);
  }
}
