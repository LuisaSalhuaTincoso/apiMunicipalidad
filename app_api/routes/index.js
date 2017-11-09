var express = require('express');
var router = express.Router();

var ctrlPost= require('../controllers/message');

/*Post api*/
router.get('/posts', ctrlPost.PostListById);//obtenemos la lista de posts
router.post('/posts', ctrlPost.PostCreate);//creaar post
router.get('/posts/:postid', ctrlPost.PostReadOne);//motrar un post en especifico
router.put('/posts/:postid', ctrlPost.PostUpdateOne);// actualizar un post en especifico
router.delete('/posts/:postid', ctrlPost.PostDeleteOne); //deliminar un post en especifico

module.exports = router;
