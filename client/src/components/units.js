import { GuidebookSvg } from "./svgs";
import { useNavigate } from "react-router-dom";

const Units = () => {

  const navigate = useNavigate();
  const handleModuleClick = () => {
    navigate('/lawquest/module')
  }
  return (
    <article class="max-w-2xl h-max text-white rounded-2xl bg-yellow-500 border-yellow-600">
      <header class="flex items-center justify-between gap-4 p-4">
        <div class="flex flex-col gap-1">
          <h2 class="text-2xl font-bold">Unit 1</h2>
          <p class="text-lg">Form basic sentences, greet people</p>
        </div>
        <h1 onClick={handleModuleClick}  style={{ cursor: "pointer" }} class="flex items-center gap-3 rounded-2xl border-2 border-b-4 p-3 transition hover:text-gray-100 border-yellow-600">
          <GuidebookSvg />
          <span class="sr-only font-bold uppercase lg:not-sr-only">
            Guidebook
          </span>
        </h1>
      </header>
    </article>
  );
};

export default Units;
