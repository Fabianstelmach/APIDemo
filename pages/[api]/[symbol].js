import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState(null);
  const router = useRouter();
  const query = router.query;

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${query.symbol}&interval=5min&apikey=${query.api}`;
      const data = await axios.get(url);
      setData(data);
    };
    if (router.isReady) {
      fetchData();
    }
  }, [query]);

  return (
    <div className="max-w-screen-xl mx-auto py-16">
      <div className="py-4">
        <h1 className="text-2xl font-bold">Zoekopties:</h1>
        <p>Api key: {router.query.api}</p>
        <p>Zoekwoord: {router.query.symbol}</p>
      </div>
      {data && (
        <div>
          <MetaInfo data={data} />
          <DataView data={data} />
        </div>
      )}
    </div>
  );
}

const DataView = ({ data }) => {
  const actual = data.data["Time Series (5min)"];

  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold">Data</h1>

      <div className="grid grid-cols-6">
        <div>Timestamp</div>
        <div>Open</div>
        <div>High</div>
        <div>Low</div>
        <div>Close</div>
        <div>Volume</div>
      </div>
      {Object.keys(actual).map((timestamp, i) => (
        <div className="grid grid-cols-6" key={i}>
          <div>{timestamp}</div>
          {Object.values(actual[timestamp]).map((value, j) => (
            <div key={j}>{value}</div>
          ))}
        </div>
      ))}
    </div>
  );
};

const MetaInfo = ({ data }) => {
  const meta = data.data["Meta Data"];
  const keys = Object.keys(meta);

  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold">Meta info:</h1>

      {keys.map((dataKey, i) => (
        <div key={i}>
          {dataKey}: {meta[dataKey]}
        </div>
      ))}
    </div>
  );
};
