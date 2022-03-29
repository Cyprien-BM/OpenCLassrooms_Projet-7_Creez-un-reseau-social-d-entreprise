const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./models');
const authRoutes = require('./routes/auth_routes');
const profileRoutes = require('./routes/profile_routes');
const postRoutes = require('./routes/post_routes');
const commentRoutes = require('./routes/comment_routes');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();

app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;

app.use(
  session({
    secret: '!Ni%f~ufG+#To<Jp>GU$X,Lc_17q.WOzVT_rtCj=S28WKg!Tp.F|lJ_NiNuBf3',
    saveUninitialized: true,
    cookie: { maxAge: oneDay, sameSite: 'strict' },
    resave: false,
  })
);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(bodyParser.json());

app.use('/image', express.static('image'));

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/post', postRoutes);
app.use('api/comment', commentRoutes);

module.exports = app;
