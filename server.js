
// const express = require('express')
// const {spawn} = require('child_process');
// const app = express()
// const port = 3000
//
const jsdom = require("jsdom");
const {JSDOM} = jsdom;

const fetch = require('nodejs-fetch');

app.get('/', (_req, res) => {
  console.log('Calling Server')
  var dataToSend;
  // spawn new child process to call the python script
  const python = spawn('python', ['../python/main.py']);
  // collect data from script
  python.stdout.on('data', function (data) {
    console.log('Pipe data from python script ...');
    dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    console.log(dataToSend)
    res.send(dataToSend)
  });

})
app.get('/nice', async (_req, res) => {
  let data = await getData();

  res.json(data);
})


async function getData() {
  // let data = await fetch('https://merolagani.com/Ipo.aspx?type=upcoming').then(data => data.text());
  // const dom = new JSDOM(data);
  // let infos = dom.window.document.querySelectorAll('.announcement-list .media-body a');
  // infos = Array.from(infos).map(d => d.innerHTML)

  let infos = ["\n            Siddhartha Capital Limited is going to issue 2,00,00,000.00 units @Rs.10 face value each mutual fund scheme “Siddhartha Systematic Investment Scheme” to the general public starting from 16th - 20th Ashad, 2078\n        ", "\n            Manakamana Smart Laghubitta Bittiya Sanstha Limited  is going to issue its 3,89,000.00 units of IPO shares to the general public starting from 17th - 21st Ashad, 2078\n        ", "\n            Jyoti Bikas Bank Limited is going to issue its 15,00,000.00 units @ Rs.1000/unit \"9% Jyoti Bikas Bank Bond 2087\" to the general public starting from 20th - 23rd Ashad, 2078\n        ", "\n            Rastriya Banijya Bank Limited is going to issue 10,00,00,000.00 units @Rs.10 face value each mutual fund scheme “RBB Mutual Fund 1” to the general public starting from 23rd - 27th Ashad, 2078\n        ", "\n            Union Life insurance Company Limited  is going to issue its 64,50,000.00 units of IPO shares to the general public starting from 24th - 28th Ashad, 2078\n        "];

  infos = infos.map(d => {
    let o = {};
    o['name'] = d.split('is going to')[0].trim();
    o['kitta'] = d.match(/\d.*\d units/)[0].split('units')[0].trim();
    o['rate'] = d.split('units')[1].split('face')[0].trim();
    o['date'] = d.split('from')[1].trim();
    return o
  })
  console.log(infos);
  return infos;
}

getData();
app.listen(port, () => console.log(`Example app listening on port 
${port}!`))
