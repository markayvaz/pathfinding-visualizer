import React, { useEffect, useState, useRef } from "react";
import Node from "./Node";
import {
  tileSize,
  minTileDimensions,
  gridContainerPadding,
} from "./Properties";

// todo: 1. make grid responsive
// todo: 2. create nodes

const Grid = () => {
  const gridRef = useRef(null);

  const gridContainerRef = useRef(null);

  const [gridDimensions, setGridDimensions] = useState([0, 0]);

  const [tileDimensions, setTileDimensions] = useState([
    minTileDimensions[0],
    minTileDimensions[1],
  ]);

  console.log(gridDimensions);

  useEffect(() => {
    setGridDimensions([
      gridContainerRef.current.clientWidth,
      gridContainerRef.current.clientHeight,
    ]);

    window.addEventListener("resize", () => {
      setGridDimensions([
        gridContainerRef.current.clientWidth,
        gridContainerRef.current.clientHeight,
      ]);
    });
  }, [gridContainerRef]);

  useEffect(() => {
    setTileDimensions([
      Math.floor(gridDimensions[0] / tileSize),
      Math.floor(gridDimensions[1] / tileSize),
    ]);
  }, [gridDimensions]);

  useEffect(() => {
    const [columns, rows] = tileDimensions;

    let tableHTML = "";

    for (let r = 0; r < 18; r++) {
      tableHTML += '<tr class="bg-white border-b">';
      for (let c = 0; c < 34; c++) {
        if (c === 2 && r === 12) {
          tableHTML +=
            '<td class="py-4 px-4 text-sm border-x bg-indigo-600 shadow-lg shadow-indigo-600/50"></td>';
        } else if (c === 12 && r === 5) {
          tableHTML += '<td class="py-4 px-4 text-sm border-x bg-rose-500 shadow-lg shadow-rose-500/50"></td>';
        } else {
          tableHTML += '<td class="py-4 px-4 text-sm border-x"></td>';
        }
      }
      tableHTML += "</tr>";
    }

    gridRef.current.innerHTML = tableHTML;
  }, [tileDimensions]);

  return (
    <div
      id="grid-container"
      ref={gridContainerRef}
      className={`bg-indigo-100 w-full h-full flex justify-center items-center
    min-w-[${minTileDimensions[1] * tileSize}px] min-h-[${
        minTileDimensions[0] * tileSize
      }px] p-${gridContainerPadding / 4}
    `}
    >
      <div className="overflow-hidden shadow-md rounded-lg">
        <table className="">
          <tbody id="grid" ref={gridRef}></tbody>
        </table>
      </div>
    </div>
  );
};

export default Grid;
