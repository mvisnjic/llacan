import { types, Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";
import { MenuItem, MenuItemInstance } from "../menu/Menu";

export interface RestaurantInstance extends Instance<typeof Restaurant> {}
export interface RestaurantSnapshotIn extends SnapshotIn<typeof Restaurant> {}
export interface RestaurantSnapshotOut extends SnapshotOut<typeof Restaurant> {}

const { string, identifier, boolean, array, reference, maybe } = types;

export const Restaurant = types
  .model("Restaurant", {
    id: identifier,
    title: string,
    phone: string,
    address: string,
    sms_accept: boolean,
    hasPommes: boolean,
    tags: array(string),
    activeOrder: maybe(reference(MenuItem)),
  })
  .actions((self) => ({
    addOrder(menuItem: MenuItemInstance) {
      // console.warn("ORDER ADDED!");
      self.activeOrder = menuItem;
    },
    removeOrder() {
      // console.warn("ORDER REMOVED!");
      self.activeOrder = undefined;
    },
  }));
