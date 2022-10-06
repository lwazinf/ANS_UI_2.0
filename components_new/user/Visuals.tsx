import { useEffect, useRef, useState } from "react";
import { Res } from "../../src/types";

import { select, selectAll, Selection } from "d3-selection";
import d3 from "d3";

interface VisualsProps {
  data: Res | undefined;
}

const Visuals = ({ data }: VisualsProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  return (
    <div
      className={`w-full min-h-screen flex flex-col justify-center items-center`}
    >
      <svg ref={svgRef}>
      {/* {
          data ?
         data?.RSS3.transactions.map((data_: any) =>
         <g key={data_.id}>
          {data_.fee}
         </g>)
        :
        ''
        } */}
      </svg>
      <div className={`bg-red-400 w-[100px] h-[100px]`} onClick={() => {
        console.log(JSON.parse(JSON.stringify(data?.RSS3.transactions[0])))
      }}/>
    </div>
  );
};

export default Visuals;
