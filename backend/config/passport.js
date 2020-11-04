const passport = require("passport")
const { Strategy,ExtractJwt} = require("passport-kwt")
const db = require("../models")

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "facebook"
};

const jwtStrategy = new Strategy(options, async (payload, done) =>{
    const targetUser = await db.User.findOne({where:{ id: payload.id}});

    if(targetUser) {
        done(null, targetUser);
    }else{
        done(null,false);
    }
})

passport.use("jwt", jwtStrategy)