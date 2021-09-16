"use strict";

const Boom = require("@hapi/boom");

// const { jwtMiddleware } = require("./passport");

const PERMISSIONS = Object.freeze({
  ALL: "ALL",
  BASIC: "BASIC",
});

// function authorize(permissionArray) {
//   return async ({ user: { permissions } }) => {
//     if (permissionArray.some((p) => permissions[p])) {
//       return "next";
//     }
//     throw Boom.forbidden();
//   };
// }
function authorize() {
  return async (req) => {
    if (req.user) {
      return "next";
    }

    throw Boom.forbidden();
  };
}

// const ALL = [jwtMiddleware, authorize([PERMISSIONS.ALL])];
// const BASIC = [jwtMiddleware, authorize([PERMISSIONS.BASIC, PERMISSIONS.ALL])];

module.exports = {
  BASIC: [authorize()],
};
