const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

router.use('/users', thoughtRoutes);
router.use('/thoughts', userRoutes);

module.exports = router;
