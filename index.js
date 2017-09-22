'use strict';

const Hapi = require('hapi');
const fetch = require('node-fetch');
const FormData =  require('form-data');
const cheerio = require('cheerio');

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});

server.route({
  method: 'GET',
  path: '/get-amount',
  handler: function (request, reply) {

    const form = new FormData();
    form.append('email', 'samblacklock@me.com');
    form.append('password', 'poohead');
    form.append('submit', 'Sign in');

    fetch('https://www.tt2.co.uk/s/web-user-login.html', {
      method: 'POST',
      headers: {
        'Cookie': 'PHPSESSID=testtest',
        'Origin': 'https://www.tt2.co.uk',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.8',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Cache-Control': 'max-age=0',
        'Referer': 'https://www.tt2.co.uk/s/customer-login.html',
        'Connection': 'keep-alive'
      },
      body: 'email=samblacklock%40me.com&password=poohead&submit=Sign+in'
    }).then((res) => {
      return res.text()
    }).then((body) => {
      const $ = cheerio.load(body);
      const value = $('#balance strong').text();

      console.log(value);

      fetch('https://maker.ifttt.com/trigger/permit_credit/with/key/ltP3LnYZKQn2OInyZjR1OqnCu6cSoGIYc_TFDz3TFXw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'value1': value
        })
      }).then(() => reply(value));
    });
  }
});

// 'https://www.tt2.co.uk/s/web-user-login.html'
//
// 'Cookie: PHPSESSID=cehn9uu3j49q83jjgbhr2pfi62'
// 'Origin: https://www.tt2.co.uk'
// 'Accept-Encoding: gzip, deflate, br'
// 'Accept-Language: en-US,en;q=0.8'
// 'Upgrade-Insecure-Requests: 1'
// 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'
// 'Content-Type: application/x-www-form-urlencoded'
// 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
// 'Cache-Control: max-age=0'
// 'Referer: https://www.tt2.co.uk/s/customer-login.html'
// 'Connection: keep-alive'
