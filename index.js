const express = require('express');
const axios = require('axios');
const SocksProxyAgent = require('socks5-http-client/lib/Agent');

const app = express();
const proxy = 'socks5://127.0.0.1:9050';
const agent = new SocksProxyAgent(proxy);

app.use(express.static('public'));

app.get('/fetch-url', async (req, res) => {
  try {
    const url = req.query.url;
	  console.log(url)
    const response = await axios.get(url, {
      httpsAgent: agent,
      httpAgent: agent
    });
    res.send(response.data);
  } catch (error) {
	  console.log(error)
    res.send(error);
  }
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

