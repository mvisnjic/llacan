import { types, Instance, SnapshotIn, SnapshotOut } from "mobx-state-tree";

export interface CondimentInstance extends Instance<typeof Condiment> {}
export interface CondimentSnapshotIn extends SnapshotIn<typeof Condiment> {}
export interface CondimentSnapshotOut extends SnapshotOut<typeof Condiment> {}

const { identifier } = types;

export const Condiment = types
  .model("Condiment", {
    name: identifier,
    isChosen: false,
  })
  .actions((self) => ({
    chooseCondiment() {
      self.isChosen = !self.isChosen;
    },
  }));
