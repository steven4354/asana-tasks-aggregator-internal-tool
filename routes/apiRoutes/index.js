const router      = require('express').Router();
const authRoutes  = require('./authRoutes');
const asanaController = require('./../../controllers/asanaController')
const authMiddleware = require ("./../../middlewares/authMiddlewares")


router.route('/test')
  .get(authMiddleware.requireAuth, (req, res) => {
    res.send(req.user);
  });

router.route('/connect')
  .post(authMiddleware.requireAuth, asanaController.connect)

router.route('/asana')
  .post(asanaController.token)

  router.route('/asana/refresh')
  .post(authMiddleware.requireAuth, asanaController.refresh)

router.use('/auth', authRoutes);

module.exports = router;