const http = require('http');
const url = require('url');
const query = require('query-string');

const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

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

const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);

  // console.dir(parsedURL);

  const { pathname } = parsedURL;

  const params = query.parse(parsedURL.query);

  const acceptHeader = request.headers.accept.split(',');

  if (urlResponses[pathname]) {
    urlResponses[pathname](request, response, params, acceptHeader);
  } else {
    urlResponses.notFound(request, response, params, acceptHeader);
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
