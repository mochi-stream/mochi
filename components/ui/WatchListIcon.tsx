import { CirclePlusIcon } from "lucide-react";

const WatchListIcon = ({
  id,
  addToWatchList,
}: {
  id: number;
  addToWatchList: (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: number
  ) => void;
}) => {
  return (
    <CirclePlusIcon
      onClick={(e) => addToWatchList(e, id)}
      className="drop-shadow hover:text-purple-800"
    ></CirclePlusIcon>
  );
};

export default WatchListIcon;
