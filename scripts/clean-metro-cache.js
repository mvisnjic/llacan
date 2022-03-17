const path = require("path");
const os = require("os");
const rimraf = require("rimraf");

const root = path.join(os.tmpdir(), "metro-cache");

console.log(`Cleaning metro-cache at "${root}"`);
rimraf(root, (error) => {
  if (error) {
    throw error;
  }

  console.log("Successfully cleaned metro cache");
});
