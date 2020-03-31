const express = require('express');
const db = require('../models');

const router = express.Router();

router.get('/:tag', async(req, res, next)=>{
    try{
        const posts = await db.Post.findAll({
            include: [{
                model: db.Hashtag,
                where: {name:decodeURIComponent(req.params.tag)}, // 특수문자, 한자를 제대로 처리하기 위해 제대로된 글자로 바꿔줌
            },{
                model: db.User,
                attributes: ['id', 'nickname'],
            }]
        });
        res.json(posts);
    }catch(e){
        console.error(e);
        next(e);
    }
});

module.exports = router;
