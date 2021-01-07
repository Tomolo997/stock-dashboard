import regeneratorRuntime from "regenerator-runtime";
async function getData(params) {
  try {
    const res = await fetch(
      "http://api.marketstack.com/v1/eod/latest?access_key=345a3ca0ad78192423875a7895aa8875&symbols=AAPL"
    );
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

getData();
