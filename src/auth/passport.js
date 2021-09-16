"use strict";

const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
// const { Strategy: BearerStrategy } = require("passport-http-bearer");
const { compare } = require("bcrypt");
// const jwt = require("jsonwebtoken");
const Boom = require("@hapi/boom");
const { pick } = require("lodash");

const { auth: { jwt: { secret, expirationTime } } } = require("../../config");
const deferPromise = require("../util/deferPromise");
const Account = require("../account/Account.model");

const USER_TOKEN_PROPS = ["id", "email", "permissions"];

function getPromisifiedAuthMiddleware(strategyName, req, res, next) {
  const deferred = deferPromise();

  passport.authenticate(strategyName, (err, user, info) => {
    // passport.authenticate(strategyName, { session: false }, (err, user, info) => {
    if (err || !user) {
      deferred.reject(Boom.unauthorized(info && info.message));

      return;
    }

    req.logIn(user, (error) => {
      if (error) {
        deferred.reject(error);
      }

      deferred.resolve("next");
    });
  })(req, res, next);

  return deferred.promise;
}

function localMiddleware(req, res, next) {
  return getPromisifiedAuthMiddleware("local", req, res, next);
}

// function jwtMiddleware(req, res, next) {
//   return getPromisifiedAuthMiddleware("bearer", req, res, next);
// }

// function createJwt(user, issuer) {
//   const payload = pick(user, USER_TOKEN_PROPS);

//   return jwt.sign(payload, secret, {
//     expiresIn: expirationTime,
//     issuer,
//   });
// }

passport.use(new LocalStrategy(
  { usernameField: "email", passReqToCallback: true },
  // { usernameField: "email", session: false, passReqToCallback: true },
  async (req, email, password, done) => {
    try {
      const user = await Account.query().where({ email }).first();

      if (!user || !(await compare(password, user.password))) {
        return done(null, false, { message: "Invalid email or password." });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  },
));

// passport.use(new BearerStrategy(
//   { passReqToCallback: true },
//   async ({ objection: { id, models: { UserAccount } } }, token, done) => {
//     try {
//       const decoded = jwt.verify(token, secret, { issuer: id });
//       const user = await UserAccount.query().findById(decoded.id).throwIfNotFound();

//       if (!user) {
//         return done(null, false);
//       }

//       return done(null, user);
//     } catch (err) {
//       return done(err);
//     }
//   },
// ));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await Account.query().findById(userId);

    if (!user) {
      throw Boom.notFound(`No user with ID ${userId}`);
    }

    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = {
  passportInitialize: passport.initialize(),
  passportSession: passport.session(),
  localMiddleware,
  // jwtMiddleware,
  // createJwt,
};
