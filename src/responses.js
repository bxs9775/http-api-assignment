const fs = require('fs');

// file paths
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// a struct that maps an error id to other relvant error information
const errors = {
  success: {
    code: 200,
    message: 'This is a successful response',
  },
  badRequest: {
    code: 400,
    message: 'Missing valid query parameter set to true',
  },
  unauthorized: {
    code: 401,
    message: 'Missing loggedIn query parameter set to yes',
  },
  forbidden: {
    code: 403,
    message: 'You do not have access to this content',
  },
  internal: {
    code: 500,
    message: 'Internal Server Error. Something went wrong.',
  },
  notImplemented: {
    code: 501,
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
  },
  notFound: {
    code: 404,
    message: 'The page you are looking for was not found.',
  },
};


// Private methods
// writes a response with the given content. Uses errId to figure out what error code to use.
const respond = (request, response, errId, content, accept) => {
  response.writeHeader(errors[errId].code, { 'Content-Type': accept });
  response.write(content);
  response.end();
};

// provides a response with a basic success status
const successMessage = (request, response, accept) => {
  const errId = 'success';
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

// responds with an error, and related details
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
// gets the index for the server(client.html)
const getIndex = (request, response, params, accept) => {
  respond(request, response, 'success', index, accept[0]);
};

// gets the css stylesheet for the server (style.css)
const getCss = (request, response, params, accept) => {
  respond(request, response, 'success', css, accept[0]);
};

// gets the response for the '/success' url
const getSuccess = (request, response, params, accept) => {
  successMessage(request, response, accept);
};

// gets the response for the '/badRequest' url
// responds with success status if 'valid' query param is 'true', and with an error otherwise.
const getBadRequest = (request, response, params, accept) => {
  if (!params.valid || params.valid !== 'true') {
    failureMessage(request, response, 'badRequest', accept);
  } else {
    successMessage(request, response, accept);
  }
};

// gets the response for the '/unauthorized' url
// responds with success status if 'loggedIn' query param is 'yes', and with an error otherwise.
const getUnauthorized = (request, response, params, accept) => {
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    failureMessage(request, response, 'unauthorized', accept);
  } else {
    successMessage(request, response, accept);
  }
};

// gets the response for the '/forbidden' url
const getForbidden = (request, response, params, accept) => {
  failureMessage(request, response, 'forbidden', accept);
};

// gets the response for the '/notImplemented' url
const getNotImplemented = (request, response, params, accept) => {
  failureMessage(request, response, 'notImplemented', accept);
};

// gets the response for the '/internal' url
const getInternal = (request, response, params, accept) => {
  failureMessage(request, response, 'internal', accept);
};

// responds with a 404 error for any url that does not have a set response
const getNotFound = (request, response, url, accept) => {
  failureMessage(request, response, 'notFound', accept);
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
