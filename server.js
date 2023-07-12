const config = require("./src/config");
const worker =require("./src")
const data = require("./src/data/desa_punclut.json");
const main = async () => {
  try {
    console.log("Worker Running....");
    config.database_connection();
    worker.worker(data);
  } catch (error) {
    console.log(error);
  }
};
main();
