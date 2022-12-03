export default async function handler(request, response) {
  const https = require('https');

  let url = decodeURIComponent(request.query.url);

  const { status, data } = await getRequest(url);
  response.status(status).send(data);

  function getRequest(url) {
    return new Promise(resolve => {
      const req = https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            data: data
          });
        });
      });
    });
  }
};
