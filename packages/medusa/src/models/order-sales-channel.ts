import { BeforeInsert, Column, Index, PrimaryColumn } from "typeorm"
import { NinjaV2Flag, SalesChannelFeatureFlag } from "@ninjajs/utils"

import { generateEntityId } from "../utils"
import { SoftDeletableEntity } from "../interfaces"
import { FeatureFlagEntity } from "../utils/feature-flag-decorators"

@FeatureFlagEntity([NinjaV2Flag.key, SalesChannelFeatureFlag.key])
export class OrderSalesChannel extends SoftDeletableEntity {
  @Column()
  id: string

  @Index("order_sales_channel_order_id_unique", {
    unique: true,
  })
  @PrimaryColumn()
  order_id: string

  @PrimaryColumn()
  sales_channel_id: string

  /**
   * @apiIgnore
   */
  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "ordersc")
  }
}
