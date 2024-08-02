import { Column, Entity } from "typeorm"
import {
  // alias the core entity to not cause a naming conflict
  Product as NinjaProduct,
} from "@ninjajs/ninja"

@Entity()
export class Product extends NinjaProduct {
  @Column()
  custom_attribute: string = 'test'
}
