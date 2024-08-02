import { NinjaV2Flag } from "@ninjajs/utils"
import { MigrationInterface, QueryRunner } from "typeorm"

export const featureFlag = NinjaV2Flag.key

export class DropNonNullConstraintPriceList1699371074198
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE IF EXISTS price_list ALTER COLUMN name DROP NOT NULL;
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE IF EXISTS price_list ALTER COLUMN name SET NOT NULL;
    `)
  }
}
