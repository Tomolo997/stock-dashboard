import * as model from './model';
var ctx = document.getElementById('myChart').getContext('2d');
var Chart = require('chart.js');
const logoDiv = document.querySelector('.stock__logo');
const nameSPAN = document.querySelector('.stockName__span');
const stockSymbol = document.querySelector('.stockSymbol__span');

const last5Day = document.querySelector('.a_last5day');
const last1Month = document.querySelector('.a_last30day');
const last6Months = document.querySelector('.a_last180day');
const last1Year = document.querySelector('.a_last360day');
let lineChart = '';
function getDatAndDisplayGraph() {
  model.getTicker().then(res => {
    for (const entry of res.data) {
      model.state.dataTickers.push({
        name: model.changeName(entry.name),
        symbol: entry.symbol,
      });
    }

    setTimeout(() => {
      let getWebsite = [];
      getWebsite = model.state.dataTickers.filter(
        el => el.symbol === model.state.symbol
      );
      const htmlIMG = `<img src="https://logo.clearbit.com/${getWebsite[0].name}" class="logoCard">`;
      logoDiv.innerHTML = htmlIMG;

      nameSPAN.textContent = `${model.changeNameForHTML(getWebsite[0].name)}`;
      stockSymbol.textContent = `${getWebsite[0].symbol}`;
    }, 200);
  });
  model.getData('fb', 1000).then(res => {
    model.state.symbol = res.data[2].symbol;
    const xAxis = [];
    const xAxisDates = [];
    for (const entry of res.data) {
      model.state.dataOpenDates.push({
        stockPrice: entry.open,
        day: model.changeDate(entry.date),
      });
    }
    for (let i = 0; i < model.state.dataOpenDates.length; i++) {
      const element = model.state.dataOpenDates[i];
      xAxis.push(element.stockPrice);
      xAxisDates.push(element.day);
    }
    const xAxisRev = xAxis.reverse();
    const xAxisDatesRev = xAxisDates.reverse();

    console.log(xAxisRev);
    //filtriramo podatke
    last5Day.addEventListener('click', function (e) {
      sliceTHeData(xAxisRev, 6);
      e.target.classList.add('active');
      last1Month.classList.remove('active');
      last6Months.classList.remove('active');
      last1Year.classList.remove('active');
    });

    last1Month.addEventListener('click', function (e) {
      sliceTHeData(xAxisRev, 31);
    });

    last6Months.addEventListener('click', function (e) {
      sliceTHeData(xAxisRev, 180);
    });

    last1Year.addEventListener('click', function (e) {
      sliceTHeData(xAxisRev, -1);
    });

    displaGraph(xAxisRev);
  });

  function sliceTHeData(arr, to) {
    const arraySliced = arr.slice(0, to);
    console.log(arraySliced);
    lineChart.destroy();
    displaGraph(arraySliced);
  }

  //model.getData returns a promise
  function displaGraph(dataX) {
    console.log(dataX.length);
    lineChart = new Chart(ctx, {
      type: 'line',
      label: true,
      data: {
        labels: new Array(dataX.length).fill(''),
        datasets: [
          {
            label: '',
            data: dataX,
            pointRadius: 2 ? dataX.length < 32 : 0,
            pointHoverRadius: 3,
            backgroundColor: ['white'],
            borderColor: 'blue',
            pointHoverBackgroundColor: 'blue',
            borderWidth: 2,
          },
        ],
      },
      options: {
        legend: { display: false },
        scaleShowLabels: false,
        scales: {
          yAxes: [
            {
              gridLines: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                beginAtZero: false,
                suggestedMin: Math.min.apply(Math, dataX),
                suggestedMax: Math.max.apply(Math, dataX),
              },
            },
          ],
          xAxes: [
            { display: false },
            {
              gridLines: {
                display: false,
              },

              ticks: {
                beginAtZero: false,
              },
            },
          ],
        },
      },
    });
  }
}
getDatAndDisplayGraph();

console.log(model.state);
