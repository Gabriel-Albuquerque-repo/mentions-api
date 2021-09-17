const express = require('express');
const {check} = require('express-validator');
const router = express.Router();
const mentionsController = require('../controllers/mentions-controller');

router.get('/', mentionsController.listMentions);
router.post('/login', [
    check('login').exists(), check('senha').exists()], 
    mentionsController.login)
router.post('/', [
    check('friend').isLength({min: 7}).withMessage("O nome precisa ter no mínimo 7 caracteres"),
    check('mention').isLength({min: 20, max: 280}).withMessage("A menção precisa ter no mínimo 20 caracteres e no máximo 280.")
    ],mentionsController.createMention);

router.put('/update',
mentionsController.testes);


router.put('/:id',[
    check('friend').optional().isLength({ min: 7 }).withMessage("O nome precisa ter no mínimo 7 caracteres."),
    check('mention').optional().isLength({ min: 20, max: 280 }).withMessage("A menção precisa ter no mínimo 20 caracteres e no máximo 280.")
], mentionsController.updateMention);

router.get('/testes2', mentionsController.testes2);


module.exports = router;