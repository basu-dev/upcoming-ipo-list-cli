const jsdom = require("jsdom");

const {JSDOM} = jsdom;


const fetch = require('nodejs-fetch');

async function fetchNepaliDate() {
  let data = await fetch("https://english.hamropatro.com/").then(data => data.text());
  const dom = new JSDOM(data);
  let date = dom.window.document.querySelector("span.nep");
  console.log(date);
}

async function getData() {
  console.log("\n==== Fetching Upcoming Ipo List ======\n");
  let data = await fetch('https://merolagani.com/Ipo.aspx?type=upcoming').then(data => data.text());
  const dom = new JSDOM(data);
  let infos = dom.window.document.querySelectorAll('.announcement-list .media-body a');

  infos = Array.from(infos).map(d => d.innerHTML)

  // let infos = ["\n            Siddhartha Capital Limited is going to issue 2,00,00,000.00 units @Rs.10 face value each mutual fund scheme “Siddhartha Systematic Investment Scheme” to the general public starting from 16th - 20th Ashad, 2078\n        ", "\n            Manakamana Smart Laghubitta Bittiya Sanstha Limited  is going to issue its 3,89,000.00 units of IPO shares to the general public starting from 17th - 21st Ashad, 2078\n        ", "\n            Jyoti Bikas Bank Limited is going to issue its 15,00,000.00 units @ Rs.1000/unit \"9% Jyoti Bikas Bank Bond 2087\" to the general public starting from 20th - 23rd Ashad, 2078\n        ", "\n            Rastriya Banijya Bank Limited is going to issue 10,00,00,000.00 units @Rs.10 face value each mutual fund scheme “RBB Mutual Fund 1” to the general public starting from 23rd - 27th Ashad, 2078\n        ", "\n            Union Life insurance Company Limited  is going to issue its 64,50,000.00 units of IPO shares to the general public starting from 24th - 28th Ashad, 2078\n        "];

  infos = infos.map(d => {
    let o = {};
    o['name'] = d.split('is going to')[0].trim();
    o['kitta'] = d.match(/\d.*\d units/)[0].split('units')[0].trim(); o['date'] = d.split('from')[1].trim();
    rate = d.match(/Rs.\d*/);
    if (rate) {
      o['rate'] = rate[0];
    }
    return o
  })
  console.table(infos);

  return infos;
}

getData();
// fetchNepaliDate();
