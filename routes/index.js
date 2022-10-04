const express = require("express");
const assetRoute = require("./assets.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/assets",
    route: assetRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
