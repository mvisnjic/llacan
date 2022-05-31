import { types, Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";

export interface MenuItemInstance extends Instance<typeof MenuItem> {}
export interface MenuItemSnapshotIn extends SnapshotIn<typeof MenuItem> {}
export interface MenuItemSnapshotOut extends SnapshotOut<typeof MenuItem> {}

const { identifier, string, number, optional } = types;

export const MenuItem = types.model("MenuItem", {
  category: string,
  price: number,
  name: identifier,
  description: optional(string, ""),
});
