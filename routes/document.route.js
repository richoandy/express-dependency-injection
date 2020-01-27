const router = require('express').Router();
const { verifyToken, cronGuard } = require('../middlewares/auth');
const documentRepo = require('../repositories/document.repo');
const document = require('../controllers/document.ct')(documentRepo);

router.get('/:value', verifyToken, document.get);
router.get('/', verifyToken, document.list);
router.post('/', verifyToken, document.create);
router.put('/:ref', verifyToken, document.update);
router.delete('/cleanup', cronGuard, document.cleanup);
router.delete('/:ref', verifyToken, document.remove);

module.exports = router;
