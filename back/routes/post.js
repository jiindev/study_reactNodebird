const express = require('express');
const db = require('../models');
const router = express.Router();

router.post('/', async(req, res, next) => {
    try{
        const hashtags = req.body.content.match(/#[^\s]+/g);
        console.log(req.body);
        const newPost = await db.Post.create({
            content: req.body.content, // ex) '컨텐츠 #이렇게 #해시'
            UserId: req.user.id,
        });
        if(hashtags){
            const result = await Promise.all(hashtags.map(tag=>db.Hashtag.findOrCreate(
                {where:{name: tag.slice(1).toLowerCase()},
            })));
            await newPost.addHashtags(result.map(r=>r[0]));
        }
        //const User = await newPost.getUser();
        //newPost.User = User;
        //res.json(newPost);
        const fullPost = await db.Post.findOne({
            where: {id:newPost.id},
            include: [{
                model: db.User,
            }]
        })
        res.json(fullPost);
    }catch(e){
        console.error(e);
        next(e);
    }
});
router.post('/images', (req, res) => {

});

router.get('/:id/comments', async(req, res, next)=>{
    try{
        const post = await db.Post.findOne({where:{id:req.params.id}});
        if(!post){
            return res.status(404).send('존재하지 않는 포스트입니다.');
        }
        const comments = await db.Comment.findAll({
            where:{
                postId: req.params.id,
            },
            order: [['createdAt', 'ASC']],
            include:[{
                model: db.User,
                attributes:['id','nickname'],
            }],
        });
        res.json(comments);
    }catch(e){
        console.error(e);
        next(e);
    }
});
router.post('/:id/comment', async(req, res, next)=>{
    try{
        if(!req.user){
            return res.status(401).send('로그인이 필요합니다.');
        }
        const post = await db.Post.findOne({where:{id:req.params.id}});
        if(!post){
            return res.status(404).send('존재하지 않는 포스트입니다.');
        }
        const newComment = await db.Comment.create({
            PostId: post.id,
            UserId: req.user.id,
            content: req.body.content,
        });
        await post.addComment(newComment.id);
        const comment = await db.Comment.findOne({
            where:{
                id: newComment.id,
            },
            include:[{
                model: db.User,
                attributes:['id','nickname'],
            }]
        });
        return res.json(comment);
    } catch(e){
        console.error(e);
        return next(e);
    }
});

module.exports = router;