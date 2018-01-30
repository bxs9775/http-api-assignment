const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/stype.css`);

// Private methods
const respond = (request, response, content, accept) => {

};

const successMessage = (request, response, accept) => {

};

const failureMessage = (request, response, errCode, accept) => {

};

// Public get methods
const getIndex = (request, response, url, accept) => {

};

const getCss = (request, response, url, accept) => {

};

const getBadRequest = (request, response, url, accept) => {

};

const getUnaccepted = (request, response, url, accept) => {

};

const getForbidden = (request, response, url, accept) => {

};

const getNotImplemented = (request, response, url, accept) => {

};

const getNotFound = (request, response, url, accept) => {

};

// Export modules
module.exports.getIndex = getIndex;
module.exports.getCss = getCss;
module.exports.getBadRequest = getBadRequest;
module.exports.getUnaccepted = getUnaccepted;
module.exports.getForbidden = getForbidden;
module.exports.getNotImplemented = getNotImplemented;
module.exports.getNotFound = getNotFound;
