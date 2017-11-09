var mongoose = require('mongoose');
var Blog = mongoose.model('Message');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.PostListById = function(req,res){
    Blog
        .find()
        .exec(function(err, blog) {
            if (!blog) {
                sendJsonResponse(res, 404, {
                    "message": "posts not found"}
                    );
                return;
            } else if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, blog);
        });
}


module.exports.PostReadOne = function(req, res) {
    if (req.params && req.params.postid) {
        Blog
            .findById(req.params.postid)
            .exec(function(err, blog) {
                console.log("where is");
                if (!blog) {
                    sendJsonResponse(res, 404, {
                        "message": "postid not found"}
                        );
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, blog);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No postid in request"}
            );
    }
};

module.exports.PostCreate = function(req, res) {

    Blog.create({

        categoria : req.body.categoria,
      	emisor: req.body.emisor,
      	mensaje: req.body.mensaje,
      	receptor:req.body.receptor,

    }, function(err,postB){
        if(err){
            console.log(err);
            sendJsonResponse(res,400,err);
        }else {
            console.log(postB);
            sendJsonResponse(res,201,postB);
        }
    });
};

module.exports.PostUpdateOne = function(req, res) {
    if (!req.params.postid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, postid is required"}
            );
        return;
    }

   Blog
        .findById(req.params.postid)
        .select('-comments')
        .exec(
            function(err, postB) {
                if (!postB) {
                    sendJsonResponse(res, 404, {
                        "message": "publishid not found"}
                        );
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
		post.categoria=req.body.categoria;
		post.emisor= req.body.emisor;
		post.mensaje=req.body.mensaje;
		post.receptor=req.body.receptor;


                post.save(function(err, postB) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, postB);
                    }
                });
        }
    );
};


module.exports.PostDeleteOne = function(req, res) {
    var postid = req.params.postid;

    if (postid) {
       Blog
            .findByIdAndRemove(postid)
            .exec(
                function(err, postB) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    sendJsonResponse(res, 204, null);
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "No postid"}
            );
    }
};
