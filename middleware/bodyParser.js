const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

//const bodyEncodedParser = bodyParser.urlencoded({ extended: false });
module.exports = jsonParser;
