import data from "./../src/decent.land.json";
import { select, Selection } from "d3-selection";
import { useEffect, useRef, useState } from "react";

interface Playground_Props {}

const Playground_ = () => {
  const ref = useRef(null)
  const [selection_, setSelection_] = useState<null | Selection<null, unknown, null, undefined>>(null)

  useEffect(() => {
    if(!selection_){
      setSelection_(select(ref.current));
    } else {
      selection_
      .append('rect')
      .attr('width', 100)
      .attr('height', 200)
      .attr('fill', 'red')
    }
  }, [selection_])

  return (
    <div className={`w-full min-h-screen flex flex-col justify-center items-center`}>
      <svg
      ref={ref}
    />
    </div>
  )
}

export default Playground_;
