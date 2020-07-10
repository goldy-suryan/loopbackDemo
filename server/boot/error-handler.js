module.exports = function() { 
    return function logError(err, req, res, next) { 
       if (err) {
        //  console.log('ERR', req.url, err);
         return next({statusCode: err.statusCode, message: err.message });
       }
       next();
    };
 };