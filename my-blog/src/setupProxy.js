const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // This is the endpoint you want to proxy
    createProxyMiddleware({
      target: 'http://localhost:8000', // Your backend's URL
      changeOrigin: true,
    })
  );
};