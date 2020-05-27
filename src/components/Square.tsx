import {ISquare} from "../domain/entity";
import React from "react";

interface SquareProps {
  value: ISquare;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({value, onClick}) => {
  return (
      <button className="square" onClick={onClick}>
        {value}
      </button>
  );
};

export default Square;
