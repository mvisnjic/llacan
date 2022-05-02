import { types, Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";

export interface MenuInstance extends Instance<typeof MenuCategories> {}
export interface MenuSnapshotIn extends SnapshotIn<typeof MenuCategories> {}
export interface MenuSnapshotOut extends SnapshotOut<typeof MenuCategories> {}

const { string, number, optional, array } = types;

export const Menu = types.model("MenuItem", {
  category: string,
  price: number,
  name: string,
  description: optional(string, "default"),
});

export const MenuItem = types.model("Menu", {
  title: string,
  description: array(Menu),
});

export const MenuCategories = types.model("CategorizedMenu", {
  key: string,
  menu: array(Menu),
});
