import * as model from './model.js';

fetch(
  'https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?q=tesla&region=US',
  {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'cb87a1d8e3msh720b35361aef2c4p108c3bjsn6a7e31b76186',
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    },
  }
)
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.error(err);
  });
