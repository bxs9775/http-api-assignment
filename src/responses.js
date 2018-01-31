const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/stype.css`);

const errors = {
  'success': {
    code: '200',
    message: 'This is a successful response'
  },
  'badRequest': {
    code: 400,
    message: 'Missing valid query parameter set to true'
  },
  'unauthorized': {
    code: 401,
    message: 'Missing loggedIn query parameter set to yes'
  },
  'forbidden':{
    code: 403,
    message: 'You do not have access to this content'
  },
  'internal': {
    code: 500,
    message: 'Internal Server Error. Something went wrong.'
  },
  'notImplemented': {
    code: 501,
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.'
  },
  'notFound': {
    code: 404,
    message: 'The page you are looking for was not found.'
  }
}



// Private methods
const respond = (request, response, errId, content, accept) => {
  response.writeHeader(errors[errId].code,{ 'Content-Type': accept });
  response.write(content);
  response.end();
};

const checkParameters(url,parameter,value){
  const paramPair = `${parameter}=${value}`;
  
  const queryParams = url.query.split(',');
  for(var i = 0; i < queryParams.length; i++){
    if(queryParams[i] == paramPair){
      return true;
    }
  }
  return false;
}

const successMessage = (request, response, accept) => {

};

const failureMessage = (request, response, errId, accept) => {

};

// Public get methods
const getIndex = (request, response, url, accept) => {
  respond(request, response, 'success', index, accept);
};

const getCss = (request, response, url, accept) => {
  respond(request, response, 'success', css, accept);
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
