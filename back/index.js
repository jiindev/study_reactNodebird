const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');

const passportConfig = require('./passport');
const db = require('./models');
const userAPIRouter = require('./routes/user');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');
dotenv.config();
const app = express();
db.sequelize.sync();
passportConfig();

app.use(morgan('dev')); // app.use는 부가적인 요소들(미들웨어)를 붙여줄 수 있다.
app.use(express.json()); // json 형식의 본문 처리
app.use(express.urlencoded({extended: true})); // form으로 넘어온 데이터 처리
app.use(cors({
    origin: true, // 요청 주소랑 같도록
    credentials: true // 프론트와 쿠키 주고받을 수 있도록.. front의 axios에서도..
}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave: false, // 매번 세션 강제 저장
    saveUninitialized: false, // 빈 값도 저장
    secret: process.env.COOKIE_SECRET, // 암호화 키
    cookie: {
        httpOnly: true, // 쿠키를 자바스크립트에서 접근하지 못함
        secure: false, // https를 쓸 때 true로
    },
    name: 'rnbck' // 해킹 방지하기 위해 쿠키 이름 변경
}));
app.use(passport.initialize());
app.use(passport.session()); // express-session보다 아래에 적어야함 (express-session을 내부적으로 사용해서)

// API는 다른 서비스가 내 서비스의 기능을 실행할 수 있게 열어둔 창구
app.use('/api/user', userAPIRouter); 
app.use('/api/post', postAPIRouter); 
app.use('/api/posts', postsAPIRouter); 

app.listen(3065, () => {
    console.log('server is running on http://localhost:8080');
})