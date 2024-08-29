/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
const { spawn } = require("child_process");
const path = require("path");

const runner = () => {
  const args = process.argv.slice(2);
  const fileName = args
    .find((arg) => arg.startsWith("--fileName="))
    ?.split("=")[1];

  if (!fileName) {
    console.error("Please provide a file name with --fileName= option");
    process.exit(1);
  }

  const scriptPath = path.resolve(__dirname, fileName);

  const child = spawn("ts-node", [scriptPath], { stdio: "inherit" });

  child.on("error", (err: any) => {
    console.error(`Failed to start subprocess: ${err.message}`);
    process.exit(1);
  });

  child.on("exit", (code: any) => {
    if (code !== 0) {
      console.error(`Subprocess exited with code ${code}`);
      process.exit(code as number);
    }
  });
};

runner();
