import { types, Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";

export interface RestaurantInstance extends Instance<typeof Restaurant> {}
export interface RestaurantSnapshotIn extends SnapshotIn<typeof Restaurant> {}
export interface RestaurantSnapshotOut extends SnapshotOut<typeof Restaurant> {}

const { string, identifier, boolean, array } = types;

export const Restaurant = types.model("Restaurant", {
  id: identifier,
  title: string,
  phone: string,
  address: string,
  sms_accept: boolean,
  hasPommes: boolean,
  tags: array(string),
});
