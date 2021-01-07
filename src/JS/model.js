import regeneratorRuntime from 'regenerator-runtime';
export const state = {
  dataOpenDates: new Map(),
  symbol: '',
};

export async function getData(symbol) {
  try {
    const res = await fetch(
      `http://api.marketstack.com/v1/eod?access_key=345a3ca0ad78192423875a7895aa8875&symbols=${symbol}&limit=1000`
    );
    const data = await res.json();

    for (const entry of data.data) {
      state.dataOpenDates.set(entry.open, changeDate(entry.date));
      state.symbol = symbol;
    }

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

function changeDate(str) {
  const dateString = str.slice(0, 10);
  return dateString;
}
