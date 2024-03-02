"use client";

import { useMap, useText } from "@y-sweet/react";
import Editor from "@/app/chat/Editor";
import { useEffect, useState } from "react";

const GRID_SIZE = 10;
const DEFAULT_COLOR = "white";
// For simplicity, we'll just add one color option
// We'll add the color picker in the next step
const COLOR_SELECTIONS = ["black"];

export function Grid() {
  const [coords, setCoords] = useState([0, 0]);
  // Initialize our Color Grid as an object of cell positions that map to
  // color values. `useMap` returns a Y.Map, and subscribes the component
  // to changes in that map.
  const items = useMap<Text>("colorgrid");
  return (
    <div className="space-y-3 p-4 lg:p-8">
      <div>Color Grid</div>
      <Editor coords={coords} />
      <table className="bg-slate-100">
        <tbody>
          {Array.from({ length: GRID_SIZE }, (x, i) => (
            <tr key={i}>
              {Array.from({ length: GRID_SIZE }, (x, j) => {
                // Turn the cell position as a string.
                const key = `${i},${j}`;
                const itemColor = items!.get(key);
                let color;
                if (i == coords[0] && j == coords[1]) {
                  color = "red";
                } else {
                  color = itemColor || DEFAULT_COLOR;
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
