var AuthenticationController = require('./controllers/authentication'),
    PartyController = require('./controllers/party'),
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');

var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});

module.exports = function(app){

    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        partyRoutes = express.Router();

    // Auth Routes
    apiRoutes.use('/auth', authRoutes);

    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);

    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });

    // Routes
    apiRoutes.use('/party', partyRoutes);

    partyRoutes.get('/get', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), PartyController.getParties);
    partyRoutes.get('/start', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), PartyController.startQuiz);
    partyRoutes.post('/answare', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), PartyController.answareQuiz);
    partyRoutes.post('/create', requireAuth, AuthenticationController.roleAuthorization(['creator','editor', 'reader']), PartyController.createParty);
    partyRoutes.delete('/:quiz_id', requireAuth, AuthenticationController.roleAuthorization(['editor', 'creator']), PartyController.deleteQuiz);

    // Set up routes
    app.use('/api', apiRoutes);

}
