const { Types } = require('mongoose');

module.exports = function (req, res, next) {
	if (!Types.ObjectId.isValid(req.params.id))
		return res.status(400).send({ error: true, message: 'Invalid object Id.' });
	next();
};
