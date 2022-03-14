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
  const [isDrawingWalls, setIsDrawingWalls] = useState(false);
  const [draggedNode, setDraggedNode] = useState(null);

  const [grid, setGrid] = useState([]);

  const [player, setPlayer] = useState(null);
  const [goal, setGoal] = useState(null);

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

    setPlayer(startPosition);
    setGoal(goalPosition);

    return [startPosition, goalPosition];
  };

  const renderGrid = () => {
    // todo: add event listeners to each node
    let rows = [];

    grid.map((row, i) => {
      let columns = [];
      row.map((node, j) => {
        switch (node.state) {
          case "PLAYER":
            columns.push(
              <td
                id={`${j}-${i}`}
                key={`${j}-${i}`}
                className={`py-4 cursor-${
                  draggedNode ? "grabbing" : "grab"
                } px-4 text-sm border-x bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/50`}
                onMouseEnter={(e) => handleMouseEnter(e)}
                onMouseUp={(e) => handleMouseUp(e)}
              ></td>
            );
            break;
          case "GOAL":
            columns.push(
              <td
                id={`${j}-${i}`}
                key={`${j}-${i}`}
                className={`py-4 cursor-${
                  draggedNode ? "grabbing" : "grab"
                } px-4 text-sm border-x bg-rose-500 hover:bg-rose-600 shadow-lg shadow-rose-500/50`}
                onMouseEnter={(e) => handleMouseEnter(e)}
                onMouseUp={(e) => handleMouseUp(e)}
              ></td>
            );
            break;
          case "WALL":
            columns.push(
              <td
                id={`${j}-${i}`}
                key={`${j}-${i}`}
                className="py-4 cursor-crosshair px-4 text-sm border-x bg-slate-400 hover:bg-slate-500 shadow-lg shadow-slate-400/50"
                onMouseEnter={(e) => handleMouseEnter(e)}
                onMouseUp={(e) => handleMouseUp(e)}
              ></td>
            );
            break;
          default:
            columns.push(
              <td
                id={`${j}-${i}`}
                key={`${j}-${i}`}
                className="py-4 cursor-crosshair px-4 text-sm hover:bg-gray-300 border-x"
                onMouseEnter={(e) => handleMouseEnter(e)}
                onMouseUp={(e) => handleMouseUp(e)}
              ></td>
            );
            break;
        }
      });

      rows.push(
        <tr key={`row-${i}`} className="bg-white border-b">
          {columns}
        </tr>
      );
    });

    return rows;
  };

  const handleMouseDown = (e) => {
    e.preventDefault();

    setIsMouseDown(true);

    const [col, row] = e.target.id.split("-");

    const nodeState = grid[row][col].state;

    let updatedGrid = [...grid];

    switch (nodeState) {
      case "EMPTY":
        updatedGrid[row][col].state = "WALL";
        setIsDrawingWalls(true);
        break;
      case "WALL":
        updatedGrid[row][col].state = "EMPTY";
        setIsDrawingWalls(false);
        break;
      case "PLAYER":
        setDraggedNode("PLAYER");
        break;
      case "GOAL":
        setDraggedNode("GOAL");
        break;
      default:
        break;
    }

    setGrid(updatedGrid);
  };

  const handleMouseEnter = (e) => {
    e.preventDefault();

    if (isMouseDown) {
      const [col, row] = e.target.id.split("-");

      let updatedGrid = [...grid];

      switch (grid[row][col].state) {
        case "EMPTY":
          if (draggedNode === "PLAYER") {
            updatedGrid[player[1]][player[0]].state = "EMPTY";

            updatedGrid[row][col].state = "PLAYER";

            setPlayer([col, row]);
          } else if (draggedNode === "GOAL") {
            updatedGrid[goal[1]][goal[0]].state = "EMPTY";

            updatedGrid[row][col].state = "GOAL";

            setGoal([col, row]);
          } else if (isDrawingWalls) {
            updatedGrid[row][col].state = "WALL";
          }
          break;
        case "WALL":
          if (!isDrawingWalls) {
            updatedGrid[row][col].state = "EMPTY";
          }
          break;
        default:
          break;
      }

      setGrid(updatedGrid);
    }
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    setIsMouseDown(false);
    setDraggedNode(null);
  };

  const handleMouseLeave = (e) => {
    e.preventDefault();
    setIsMouseDown(false);
    setDraggedNode(null);
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
            onMouseLeave={(e) => handleMouseLeave(e)}
            onMouseUp={(e) => handleMouseUp(e)}
          >
            {renderGrid()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Grid;
