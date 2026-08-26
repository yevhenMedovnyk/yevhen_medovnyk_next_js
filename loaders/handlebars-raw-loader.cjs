module.exports = function handlebarsRawLoader(source) {
	return `export default ${JSON.stringify(source)};`;
};
