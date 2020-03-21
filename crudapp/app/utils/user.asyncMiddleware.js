/*const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};*/
/*module.exports = (fn) => {
	return (req, res, next) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
}*/

module.exports = (fn) => {
	return (req, res, next) => new Promise(function(resolve, reject) {
		try{
			resolve(fn(req, res, next));	
		}catch(err){
			reject(err);
		}
	});
}

