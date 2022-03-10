import RadioButton from "../components/elements/RadioButton";
import "./App.css";

const App = () => {
  return (
    <div class="">
      <aside class="w-64" aria-label="Sidebar">
        <div class="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
          <a href="/" class="flex pl-2.5 mb-2">
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Pathfinding Visualizer
            </span>
          </a>

          <div class="pl-2.5 mb-5">
            An interactive pathfinding application that illustrates how various
            pathfinding algorithms work. Pick an algorithm to get started!
          </div>

          <fieldset class="pl-4">
            <legend class="text-lg font-medium mb-4">Algorithms</legend>

            <RadioButton
              id="algorithms-option-1"
              label="Depth First Search"
              value="dfs"
              group="algorithms"
            />

            <RadioButton
              id="algorithms-option-2"
              label="Breadth First Search"
              value="bfs"
              group="algorithms"
            />

            <RadioButton
              id="algorithms-option-3"
              label="Dijkstra's algorithm"
              value="dijkstra"
              group="algorithms"
            />

            <RadioButton
              id="algorithms-option-4"
              label="A*"
              value="a-star"
              group="algorithms"
            />
          </fieldset>

          <div class="mt-2 pl-4">
            <legend class="text-lg font-medium mb-2">Speed</legend>

            <div className="flex items-center">
              Slow
              <input
                type="range"
                name="speed"
                id="speed"
                class="appearance-none cursor-pointer mt-1 ml-2 mr-2 h-2 rounded-xl bg-gray-200"
              />
              Fast
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default App;
