export default async function handler(request, response) {
  const https = require('https');

  const Stream = require('stream').Transform;

  const getRequest = (url) => {
    return new Promise(resolve => {
      const req = https.get(url, (res) => {
        const data = new Stream();   
        res.on('data', (chunk) => {
          data.push(chunk); 
        });
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            data: data.read()
          });
        });
      });
    });
  };

  const { status, data } = await getRequest(
    decodeURIComponent(request.query.url)
  );

  response.status(status).send(data);
};
