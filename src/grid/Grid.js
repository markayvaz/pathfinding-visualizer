import React, { useEffect, useState, useRef } from "react";
import Node from "./Node";
import {
  tileSize,
  minTileDimensions,
  gridContainerPadding,
} from "./Properties";
import { getRandomInt } from "../assets/HelperFunctions";

// todo: 1. make grid responsive

const Grid = () => {
  const gridRef = useRef(null);

  const gridContainerRef = useRef(null);

  const [gridDimensions, setGridDimensions] = useState([0, 0]);

  const [tileDimensions, setTileDimensions] = useState([36, 20]);

  const [isMouseDown, setIsMouseDown] = useState(false);

  const [grid, setGrid] = useState([]);

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
    createGrid();
  }, []);

  const createGrid = () => {
    // Create an empty 2D array with given tile dimensions.
    const undefinedGrid = [...Array(tileDimensions[1]).fill(undefined)].map(
      () => Array(tileDimensions[0]).fill(undefined)
    );

    const [startPosition, goalPosition] = getStartingPositions();

    const definedGrid = undefinedGrid.map((row, i) => {
      return row.map((col, j) => {
        if (j === startPosition[0] && i === startPosition[1]) {
          return new Node([j, i], "PLAYER");
        } else if (j === goalPosition[0] && i === goalPosition[1]) {
          return new Node([j, i], "GOAL");
        }
        return new Node([j, i], "EMPTY");
      });
    });

    setGrid(definedGrid);
  };

  const getStartingPositions = () => {
    let startPosition = [
      getRandomInt(tileDimensions[0]),
      getRandomInt(tileDimensions[1]),
    ];

    let goalPosition = [
      getRandomInt(tileDimensions[0]),
      getRandomInt(tileDimensions[1]),
    ];

    while (startPosition.toString() === goalPosition.toString()) {
      startPosition = [
        getRandomInt(tileDimensions[0]),
        getRandomInt(tileDimensions[1]),
      ];

      goalPosition = [
        getRandomInt(tileDimensions[0]),
        getRandomInt(tileDimensions[1]),
      ];
    }

    return [startPosition, goalPosition];
  };

  const drawGrid = () => {
    let tableHTML = "";

    let a = <></>;

    grid.map((row, i) => {
      tableHTML += `<tr class="bg-white border-b">`;

      row.map((node, j) => {
        switch (node.state) {
          case "PLAYER":
            tableHTML += `<td id="${j}-${i}" class="py-4 cursor-grab px-4 text-sm border-x bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/50"></td>`;
            break;
          case "GOAL":
            tableHTML += `<td id="${j}-${i}" class="py-4 cursor-grab px-4 text-sm border-x bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/50"></td>`;
            break;
          case "WALL":
            tableHTML += `<td id="${j}-${i}" class="py-4 cursor-crosshair px-4 text-sm border-x bg-slate-400 hover:bg-slate-500 shadow-lg shadow-slate-400/50"></td>`;
            break;
          default:
            tableHTML += `<td id="${j}-${i}" class="py-4 cursor-crosshair px-4 text-sm hover:bg-gray-300 border-x"></td>`;
            break;
        }
      });

      tableHTML += "</tr>";
    });

    return { __html: tableHTML };
  };

  const handleMouseDown = (e) => {
    const [col, row] = e.target.id.split("-");

    let updatedGrid = [...grid];

    switch (grid[row][col].state) {
      case "EMPTY":
        updatedGrid[row][col].state = "WALL";
        break;
      case "WALL":
        updatedGrid[row][col].state = "EMPTY";
        break;
    }

    setGrid(updatedGrid);
  };

  const handleMouseMove = (e) => {
    console.log(e);
  };

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
          <tbody
            id="grid"
            onMouseDown={(e) => handleMouseDown(e)}
            onMouseEnter={(e) => handleMouseMove(e)}
            dangerouslySetInnerHTML={drawGrid()}
          ></tbody>
        </table>
      </div>
    </div>
  );
};

export default Grid;
