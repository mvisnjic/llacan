import { types, Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";

export interface MenuInstance extends Instance<typeof Menu> {}
export interface MenuSnapshotIn extends SnapshotIn<typeof Menu> {}
export interface MenuSnapshotOut extends SnapshotOut<typeof Menu> {}

const { string, number, optional } = types;

export const Menu = types.model("Menu", {
  category: string,
  price: number,
  name: string,
  description: optional(string, "default"),
});
