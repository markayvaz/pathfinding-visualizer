import RadioButton from "../components/elements/RadioButton";
import "./App.css";
import Grid from "../grid/Grid";
import { useEffect, useRef, useState } from "react";

const App = () => {
  const [algorithm, setAlgorithm] = useState(null);

  const [isDisabledUI, setIsDisabledUI] = useState(false);

  return (
    <div className="flex w-screen h-screen">
      <aside className="w-72" aria-label="Sidebar">
        <div className={`overflow-y-auto w-72 h-screen p-5 bg-gray-50 rounded`}>
          <a href="/" className="flex mb-2">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Pathfinding Visualizer
            </span>
          </a>

          <div className="mb-5">
            An interactive pathfinding application that illustrates how various
            pathfinding algorithms work. Pick an algorithm to get started!
          </div>

          <fieldset className="">
            <legend className="text-lg font-medium mb-4">Algorithms</legend>

            <RadioButton
              id="algorithm-option-1"
              label="Depth First Search"
              value="dfs"
              group="algorithms"
              setChecked={(e) => {
                setAlgorithm(e.currentTarget.value);
              }}
              isDisabled={isDisabledUI}
            />

            <RadioButton
              id="algorithm-option-2"
              label="Breadth First Search"
              value="bfs"
              group="algorithms"
              setChecked={(e) => {
                setAlgorithm(e.currentTarget.value);
              }}
              isDisabled={isDisabledUI}
            />

            <RadioButton
              id="algorithm-option-3"
              label="Dijkstra's algorithm"
              value="dijkstra"
              group="algorithms"
              setChecked={(e) => {
                setAlgorithm(e.currentTarget.value);
              }}
              isDisabled={isDisabledUI}
            />

            <RadioButton
              id="algorithm-option-4"
              label="A*"
              value="a-star"
              group="algorithms"
              setChecked={(e) => {
                setAlgorithm(e.currentTarget.value);
              }}
              isDisabled={isDisabledUI}
            />
          </fieldset>

          <div className="mt-2">
            <legend className="text-lg font-medium mb-2">Speed</legend>

            <div className="flex items-center">
              Slow
              <input
                type="range"
                name="speed"
                id="speed"
                className="appearance-none w-full cursor-pointer mt-1 ml-2 mr-2 h-2 rounded-xl bg-gray-200"
              />
              Fast
            </div>
          </div>

          <div className="mt-8">
            <button
              type="button"
              disabled={algorithm === null}
              className="text-white w-full disabled:bg-gray-400 bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Go
            </button>
          </div>
        </div>
      </aside>

      <Grid />
    </div>
  );
};

export default App;
