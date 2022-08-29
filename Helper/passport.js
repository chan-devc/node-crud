const passport = require("passport");
const { User } = require("../Models");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const config_db = require("../config/_db");

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config_db.authentication.JwtSecret,
    },
    async function (jwtPayload, done) {
      try {
        const user = await User.findOne({
          where: {
            email: jwtPayload.email,
          },
        });
        if (!user) {
          return done(new Error(), false);
        }
        return done(null, user);
      } catch (error) {
        return done(new Error(), false);
      }
    }
  )
);

module.exports = null;
