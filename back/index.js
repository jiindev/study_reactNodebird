const express = require('express');
const db = require('./models');
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');
const app = express();
db.sequelize.sync();

app.use(express.json()); // json 형식의 본문 처리
app.use(express.urlencoded({extended: true})); // form으로 넘어온 데이터 처리

// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
app.use('/api/user', userAPIRouter); 
app.use('/api/post', postAPIRouter); 
app.use('/api/posts', postsAPIRouter); 

app.listen(3065, () => {
    console.log('server is running on http://localhost:8080');
})