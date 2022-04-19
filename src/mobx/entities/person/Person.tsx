import { types, Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";

export interface PersonInstance extends Instance<typeof Person> {}
export interface PersonSnapshotIn extends SnapshotIn<typeof Person> {}
export interface PersonSnapshotOut extends SnapshotOut<typeof Person> {}

const { string, identifier, boolean, array } = types;

export const Person = types.model("Person", {
  id: identifier,
  title: string,
  phone: string,
  address: string,
  sms_accept: boolean,
  hasPommes: boolean,
  tags: array(string),
});
