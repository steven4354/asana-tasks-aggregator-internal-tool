const router = require('express').Router();

const asanaController = require('./../../controllers/asanaController')
const passportService = require('./../../services/passport');
const authMiddleware = require('./../../middlewares/authMiddlewares');


router.route('/connect')
  .post(asanaController.connect)

router.route('/asana')
  .post(asanaController.token)