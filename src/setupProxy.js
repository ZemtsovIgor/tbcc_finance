// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require('http-proxy-middleware');

const proxy = {
  target: 'https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest',
  changeOrigin: true,
  secure: true
}

module.exports = function(app) {
  app.use(
    '/coinmarketcap',
    createProxyMiddleware(proxy)
  );
};
