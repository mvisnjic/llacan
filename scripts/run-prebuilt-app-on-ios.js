const os = require("os");
const exec = require("child_process").execSync;

function runPrebuiltAppOnIOS() {
  if (os.type() !== "Darwin") {
    console.log(`This command can only be ran on Mac systems`);
    process.exit(-1);
  }

  try {
    exec(`xcrun --version`, { stdio: "inherit" });
  } catch (error) {
    console.log(`Error running 'xcrun --version'`);
    process.exit(-1);
  }

  const workspace = exec(`ls -d ios/*.xcworkspace`, { encoding: "utf-8" });
  if (!workspace) {
    console.log("Workspace not found");
    process.exit(-1);
  }

  const appName = workspace.match(/ios\/(.+).xcworkspace/)?.[1];

  if (!appName) {
    console.log("Error extracting appName using regex");
    process.exit(-1);
  }

  const asciiNumDirs = exec(
    `ls -d ~/Library/Developer/Xcode/DerivedData/${appName}-* | wc -l`,
    {
      encoding: "utf-8",
    }
  );

  const numDirs = parseInt(asciiNumDirs);

  if (!numDirs) {
    console.log(
      "\n\tYou must build the app before you can run it using this command\n"
    );
    process.exit(-1);
  }

  if (numDirs > 1) {
    console.log(
      `\n\tExpected 1 build directory, but found ${numDirs} build directories for ${appName} in ~/Library/Developer/Xcode/DerivedData/. Please remove other directories\n`
    );
    process.exit(-1);
  }

  function getRunningSimulatorsAscii() {
    try {
      return exec(`xcrun simctl list | grep Booted`, { encoding: "utf-8" });
    } catch (error) {
      console.log("No running Simulator instance detected");
      process.exit(-1);
    }
  }

  const runningSimulatorsAscii = getRunningSimulatorsAscii();

  const numSimulators = runningSimulatorsAscii.split("\n").length - 1;
  if (numSimulators < 1) {
    console.log("No running Simulator instance detected");
    process.exit(-1);
  }

  if (numSimulators > 1) {
    console.log("More than one Simulator instance detected");
    process.exit(-1);
  }

  const simulatorName = runningSimulatorsAscii.split(" (")[0]?.trim();

  if (!simulatorName) {
    console.log(
      `Error extracting Simulator name from ${runningSimulatorsAscii}`
    );
    process.exit(-1);
  }

  try {
    const appPath = `~/Library/Developer/Xcode/DerivedData/${appName}-*/Build/Products/Debug-iphonesimulator/${appName}.app`;

    // Uncomment this if you want to uninstall the app before installing
    // const bundleId = exec(
    //   `mdls -name kMDItemCFBundleIdentifier -r ${appPath}`,
    //   { encoding: 'utf-8' }
    // );
    // exec(`xcrun simctl uninstall "${simulatorName}" ${bundleId}`, {
    //   stdio: 'inherit'
    // });

    exec(`xcrun simctl install "${simulatorName}" ${appPath}`, {
      stdio: "inherit",
    });

    console.log("Successfully installed the app... Now trying to launch it...");

    const bundleId = exec(
      `mdls -name kMDItemCFBundleIdentifier -r ${appPath}`,
      { encoding: "utf-8" }
    );

    exec(`xcrun simctl launch "${simulatorName}" ${bundleId}`, {
      stdio: "inherit",
    });

    console.log("Successfully launched the app");
  } catch (error) {
    console.log("\n\tSomething went wrong.\n\n", error);
    process.exit(-1);
  }
}

runPrebuiltAppOnIOS();
