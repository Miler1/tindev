const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeControllers');
const DisLikeController = require('./controllers/DisLikeControllers');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.json(`Olá ${req.query.name}`);
});
// teste de requisição
/*routes.post('/devs', (req, res) => {
    //console.log(req.body);
    return res.json(req.body);
});*/
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DisLikeController.store);

module.exports = routes;