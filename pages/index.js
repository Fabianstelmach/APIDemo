import { useState } from "react";

export default function Home() {
  const [api, setApi] = useState("");

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="space-x-4 flex">
        <p>Api key:</p>
        <input
          type="text"
          value={api}
          onChange={(e) => setApi(e.target.value)}
          className="bg-blue-800 text-white py-1 px-2"
        />
      </div>
      Hello world
    </div>
  );
}
