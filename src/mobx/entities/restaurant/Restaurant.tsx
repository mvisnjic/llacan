import { types, Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";
import { Condiment, CondimentInstance } from "../condiment/Condiment";
import { MenuItem, MenuItemInstance } from "../menu/Menu";

export interface RestaurantInstance extends Instance<typeof Restaurant> {}
export interface RestaurantSnapshotIn extends SnapshotIn<typeof Restaurant> {}
export interface RestaurantSnapshotOut extends SnapshotOut<typeof Restaurant> {}

const { string, identifier, boolean, array, reference, maybe, map } = types;

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
    selectedCondiments: map(reference(Condiment)),
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
    addCondiment(condiment: CondimentInstance) {
      self.selectedCondiments.get(condiment.name)
        ? self.selectedCondiments.put(condiment)
        : self.selectedCondiments.delete(condiment.name);
    },
  }));
