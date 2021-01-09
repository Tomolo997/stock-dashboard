import regeneratorRuntime from 'regenerator-runtime';
export const state = {
  dataOpenDates: [],
  symbol: '',
  dataTickers: [],
};

export async function getData(symbol, limit) {
  try {
    const res = await fetch(
      `http://api.marketstack.com/v1/eod?access_key=345a3ca0ad78192423875a7895aa8875&symbols=${symbol}&limit=${limit}`
    );

    const data = await res.json();
    console.log(data);

    return data;
    // for (const entry of data.data) {
    //   state.dataOpenDates.push({
    //     stockPrice: entry.open,
    //     day: changeDate(entry.date),
    //   });
    // }
  } catch (error) {
    console.log(error);
  }
}

export function changeDate(str) {
  const dateString = str.slice(0, 10);
  return dateString;
}

export function changeName(str) {
  const dateString = str.split(' ');
  return dateString[0] + '.com';
}

export async function getTicker() {
  try {
    const res = await fetch(
      `http://api.marketstack.com/v1/tickers?access_key=345a3ca0ad78192423875a7895aa8875`
    );
    const data = await res.json();
    return data;
    // for (const entry of data.data) {
    //   state.dataOpenDates.push({
    //     stockPrice: entry.open,
    //     day: changeDate(entry.date),
    //   });
    // }
  } catch (error) {
    console.log(error);
  }
}
export function changeNameForHTML(str) {
  const dateString = str.slice(0, -4);
  return dateString;
}
