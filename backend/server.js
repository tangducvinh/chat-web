require("dotenv").config();
const server = require("./src/app");

const port = process.env.PORT || 5001;

server.listen(port, () => {
  console.log(`Backend start with port: ${port}`);
});
