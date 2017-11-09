(function () {

    angular
        .module('MessagePEApp')
        .service('MessagePEData', BlogINPData);

    MessagePEData.$inject = ['$http'];
    function MessagePEData ($http) {
        var listPostById = function (){
            return $http.get('/api/posts');
        };
        var postById = function (postid){
            return $http.get('/api/posts/' + postid);
        };//Para Obtener el detalle de Location
        return {
            listPostById : listPostById,
            postById : postById
        };
    };
})();
