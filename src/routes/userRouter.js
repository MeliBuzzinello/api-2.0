import { Router } from 'express';
import session from 'express-session';
import bCrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from "passport-local";

import { transporter } from '../utils/sendMail.js'; 

// import { usuariosDao as usuariosApi } from '../daos/index.js';
//import UsuariosDaoMariaDb from '../daos/usuarios/UsuariosDaoMariaDb.js';

//const User = new UsuariosDaoMariaDb;
import User from '../daos/usuarios/models.js'

const userRouter = new Router();

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
},
    (req, email, password, done) => {
        User.findOne({ 'email': email }, (err, user) => {
            if (err) {
                return done(err);
            };

            if (user) {
                return done(null, false);
            }

            const newUser = {
                email: email,
                password: createHash(password),
                username: req.body.username,
                direction: req.body.direction,
                year: req.body.year,
                phone: req.body.phone
            };

            User.create(newUser, (err, userWithId) => {
                if (!err) {
                    // Envio de mail al admin con usuario nuevo
                    let info =  transporter.sendMail({
                        from: '"Mi primer Api 👻" <foo@example.com>', 
                        to: "create.socialmediaok@gmail.com", 
                        subject: "Nuevo usuario ✔", 
                        text: "Hello world?", 
                        html: `<p>${newUser}</p>`, 
                      });

                    return done(null, userWithId);
                }
                return done(err);
                
            })
        });
    }
));

passport.use('login', new LocalStrategy(
    (email, password, done) => {
        User.findOne({ email }, (err, user) => {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false);
            }

            if (!isValidPassword(user, password)) {
                return done(null, false);
            }

            return done(null, user);
        })
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, done);
});

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}

userRouter.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 30000
    }
}));

userRouter.use(passport.initialize());
userRouter.use(passport.session());

//SIGNUP
userRouter.get('/signup', async (req, res) => {
    res.sendFile('C:/Users/usuario/Desktop/Back-end/api/views/signup.html');
});

userRouter.post('/signup', passport.authenticate('signup', {
    failureRedirect: '/api/use/failsignup'
}), async (req, res) => {
    const user = req.user;
    res.sendFile('C:/Users/usuario/Desktop/Back-end/api/views/login-ok.hbs');
});

userRouter.get('/failsignup', async (req, res) => {
    console.log('error en signup');
    res.render('signup-error', {
    });
});


//LOGIN
userRouter.get('/login', async (req, res) => {
    if (req.isAuthenticated()) {
        var user = req.user;
        res.render('login-ok', {
            email: user.email,
            password: user.password,
            username: user.userWithId
        });
    }
    else {
        res.sendFile('C:/Users/usuario/Desktop/Back-end/api/views/login.html');
    }
});

userRouter.post('/login', passport.authenticate('login', {
    failureRedirect: '/api/use/faillogin'
}), async (req, res) => {
    const user = req.user;
    console.log(user);
    res.render('login-ok', { user });
});

userRouter.get('/faillogin', async (req, res) => {
    console.log('error en login');
    res.render('login-error', { });
});

//Last part
function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/api/use/login");
    }
}

userRouter.get('/ruta-protegida', checkAuthentication, (req, res) => {
    const { user } = req;
    console.log(user);
    res.send('<h1>Ruta OK!</h1>');
});


//LOGOUT
userRouter.get('/logout', async (req, res) => {
    req.session.destroy(err => {
        if(err) {
            //logger.error(`Logout error`)
            res.json({ status: 'Logout Error', body: err })
        } else {
            //logger.info(`Usuario correcto`)
            res.render('layouts/main', { })
        }
    })
})

export default userRouter;