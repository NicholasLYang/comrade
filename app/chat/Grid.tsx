"use client";

import { useMap } from "@y-sweet/react";
import Editor from "@/app/chat/Editor";
import { useState } from "react";
import { Text as YText } from "yjs";

const GRID_SIZE = 10;
const DEFAULT_COLOR = "white";

export function Grid() {
  const [coords, setCoords] = useState<[number, number]>([0, 0]);
  const items = useMap<string>("grid");

  // Initialize our Color Grid as an object of cell positions that map to
  // color values. `useMap` returns a Y.Map, and subscribes the component
  // to changes in that map.
  return (
    <div className="space-y-3 p-4 lg:p-8">
      <textarea
        value={items.get(`${coords[0]},${coords[1]}`) || ""}
        onChange={(e) => {
          items.set(`${coords[0]},${coords[1]}`, e.target.value);
        }}
      />
      <table className="bg-slate-100">
        <tbody>
          {Array.from({ length: GRID_SIZE }, (x, i) => (
            <tr key={i}>
              {Array.from({ length: GRID_SIZE }, (x, j) => {
                // Turn the cell position as a string.
                const key = `${i},${j}`;
                let color;
                if (i == coords[0] && j == coords[1]) {
                  color = "red";
                } else if (items.has(key)) {
                  color = "blue";
                } else {
                  color = DEFAULT_COLOR;
                }
                return (
                  <td key={key}>
                    <div
                      className="w-8 h-8 cursor-pointer"
                      style={{ backgroundColor: color }}
                      onClick={() => {
                        setCoords([i, j]);
                      }}
                    />
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
