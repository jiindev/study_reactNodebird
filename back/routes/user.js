const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcrypt');
const passport = require('passport');

router.get('/', (req, res) => { // /api/user/

});
router.post('/', async (req, res, next) => { // POST /api/user 회원가입
    try{
        const exUser = await db.User.findOne({
            where: {
                userId: req.body.userId,
            },
        });
        if(exUser){
            return res.status(403).send('이미 사용중인 아이디입니다.');
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12); // salt는 10~13 사이로
        const newUser = await db.User.create({
            nickname: req.body.nickname,
            userId: req.body.userId,
            password: hashedPassword,
        });
        console.log(newUser);
        return res.status(200).json(newUser);
    }catch (e) {
        console.error(e);
        // 에러 처리를 여기서
        return next(e);
    }
});
router.get('/:id', (req, res) => { // 남의 정보 가져오기 ex) /3

});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info)=>{
        if(err){
            console.error(err);
            return next(err);
        }
        if(info){
            return res.status(401).send(info.reason);
        }
        return req.login(user, (loginErr) => {
            if (loginErr) {
                return next(loginErr);
            }
            const filteredUser = Object.assign({}, user);
            delete filteredUser.passport;
            return res.json(filteredUser);
        });
    })(req, res, next);
})
router.post('/logout', (req, res) => {

});
router.get('/:id/follow', (req, res) => {

});
router.post('/:id/follow', (req, res) => {

});
router.delete('/:id/follow', (req, res) => {

});
router.delete('/:id/follower', (req, res) => {

});
router.get('/:id/posts', (req, res) => {

});

module.exports = router;
