// const jsonServer = require('json-server');
// const clone = require('clone');
// const data = require('./db.json');

// const server = jsonServer.create();

// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults();

// server.use(middlewares);

// server.use((req, res, next) => {
//   if (req.path !== '/') router.db.setState(clone(data));
//   next();
// });

// server.use(router);
// server.listen(process.env.PORT || 8000, () => {
//   console.log('JSON Server is running');
// });

// // Export the Server API
// module.exports = server;
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
// Add this before server.use(router)
server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  })
);
server.use(router);

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log('JSON Server is running on', port);
});

// Export the Server API
module.exports = server;
