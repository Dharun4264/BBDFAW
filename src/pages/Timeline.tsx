import React from "react";
import { mockData } from "../data/mockData";

const Timeline = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Cyber Attack Timeline</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 text-left">Time</th>
              <th className="p-3 text-left">Event</th>
              <th className="p-3 text-left">File</th>
              <th className="p-3 text-left">Path</th>
              <th className="p-3 text-left">Risk</th>
            </tr>
          </thead>

          <tbody>
            {mockData.map((item) => (
              <tr
                key={item.id}
                className={`border-b ${
                  item.risk === "High"
                    ? "border-l-4 border-red-500 bg-red-50"
                    : item.risk === "Medium"
                    ? "border-l-4 border-yellow-500 bg-yellow-50"
                    : "border-l-4 border-green-500 bg-green-50"
                }`}
              >
                <td className="p-3">{item.time}</td>
                <td className="p-3">{item.event}</td>
                <td className="p-3">{item.file}</td>
                <td className="p-3">{item.path}</td>
                <td className="p-3 font-semibold">{item.risk}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timeline;