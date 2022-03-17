const exec = require("child_process").execSync;
const path = require("path");

const eslintPath = path.join(__dirname, "..", "node_modules", ".bin", "eslint");
const tscPath = path.join(__dirname, "..", "node_modules", ".bin", "tsc");

try {
  console.log("Running ESLint check...");
  exec(`${eslintPath} . --cache`, {
    stdio: "inherit",
  });
  console.log("ESLint check completed with no errors.");

  console.log("Running TypeScript check...");
  exec(tscPath, { stdio: "inherit" });
  console.log("TypeScript check completed with no errors.");
} catch (error) {
  process.exit(-1);
}
