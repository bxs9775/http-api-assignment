const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

const errors = {
  Success: {
    code: '200',
    message: 'This is a successful response',
  },
  'Bad Request': {
    code: 400,
    message: 'Missing valid query parameter set to true',
  },
  Unauthorized: {
    code: 401,
    message: 'Missing loggedIn query parameter set to yes',
  },
  Forbidden: {
    code: 403,
    message: 'You do not have access to this content',
  },
  Internal: {
    code: 500,
    message: 'Internal Server Error. Something went wrong.',
  },
  'Not Implemented': {
    code: 501,
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
  },
  'Not Found': {
    code: 404,
    message: 'The page you are looking for was not found.',
  },
};


// Private methods
const respond = (request, response, errId, content, accept) => {
  response.writeHeader(errors[errId].code, { 'Content-Type': accept });
  response.write(content);
  response.end();
};

const successMessage = (request, response, accept) => {
  const errId = 'Success';
  if (accept[0] === 'text/xml') {
    const xmlObj = `<response><message>${errors[errId].message}</message></response>`;
    respond(request, response, errId, xmlObj, 'text/xml');
  } else {
    const jsonObj = {
      message: errors[errId].message,
    };
    const jsonString = JSON.stringify(jsonObj);
    respond(request, response, errId, jsonString, 'application/json');
  }
};

const failureMessage = (request, response, errId, accept) => {
  if (accept[0] === 'text/xml') {
    let xmlObj = '<response>';
    xmlObj = `${xmlObj}<message>${errors[errId].message}</message>`;
    xmlObj = `${xmlObj}<id>${errId}</id>`;
    xmlObj = `${xmlObj}</response>`;
    respond(request, response, errId, xmlObj, 'text/xml');
  } else {
    const jsonObj = {
      id: errId,
      message: errors[errId].message,
    };
    const jsonString = JSON.stringify(jsonObj);
    respond(request, response, errId, jsonString, 'application/json');
  }
};

// Public get methods
const getIndex = (request, response, params, accept) => {
  respond(request, response, 'Success', index, 'text/html');
};

const getCss = (request, response, params, accept) => {
  respond(request, response, 'Success', css, 'text/css');
};

const getSuccess = (request, response, params, accept) => {
  successMessage(request, response, accept);
};

const getBadRequest = (request, response, params, accept) => {
  if (!params.valid || params.valid !== 'true') {
    failureMessage(request, response, 'Bad Request', accept);
  } else {
    successMessage(request, response, accept);
  }
};

const getUnauthorized = (request, response, params, accept) => {
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    failureMessage(request, response, 'Unauthorized', accept);
  } else {
    successMessage(request, response, accept);
  }
};

const getForbidden = (request, response, params, accept) => {
  failureMessage(request, response, 'Forbidden', accept);
};

const getNotImplemented = (request, response, params, accept) => {
  failureMessage(request, response, 'Not Implemented', accept);
};

const getInternal = (request, response, params, accept) => {
  failureMessage(request, response, 'Internal', accept);
};


const getNotFound = (request, response, url, accept) => {
  failureMessage(request, response, 'Not Found', accept);
};

// Export modules
module.exports.getIndex = getIndex;
module.exports.getCss = getCss;
module.exports.getSuccess = getSuccess;
module.exports.getBadRequest = getBadRequest;
module.exports.getUnauthorized = getUnauthorized;
module.exports.getForbidden = getForbidden;
module.exports.getInternal = getInternal;
module.exports.getNotImplemented = getNotImplemented;
module.exports.getNotFound = getNotFound;
