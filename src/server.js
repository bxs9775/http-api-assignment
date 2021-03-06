const http = require('http');
const url = require('url');
const query = require('query-string');

const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// struct mapping urls to responseHandler functions.
const urlResponses = {
  '/': responseHandler.getIndex,
  '/style.css': responseHandler.getCss,
  '/success': responseHandler.getSuccess,
  '/badRequest': responseHandler.getBadRequest,
  '/unauthorized': responseHandler.getUnauthorized,
  '/forbidden': responseHandler.getForbidden,
  '/notImplemented': responseHandler.getNotImplemented,
  '/internal': responseHandler.getInternal,
  notFound: responseHandler.getNotFound,
};

// an onRequest event to handle incoming http requests
const onRequest = (request, response) => {
  // parses the request url
  const parsedURL = url.parse(request.url);

  // gets the url path
  const { pathname } = parsedURL;

  // parses the query parameters, for ease of use
  const params = query.parse(parsedURL.query);

  // Gets the accept types from the request
  const acceptHeader = request.headers.accept.split(',');

  // Uses the urlResponses struct to call the correct function.
  if (urlResponses[pathname]) {
    urlResponses[pathname](request, response, params, acceptHeader);
  } else {
    urlResponses.notFound(request, response, params, acceptHeader);
  }
};

// sets up the server
http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
