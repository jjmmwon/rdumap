import type { IScale, IOriginalPoint } from "@/model";
import * as d3 from "d3";

class OriginalEmbedding {
  private group: d3.Selection<SVGGElement, undefined, null, undefined>;

  constructor(parent: d3.Selection<SVGGElement, undefined, null, undefined>) {
    this.group = parent.append("g").attr("class", "originalEmbedding");
  }

  render(origEmb: IOriginalPoint[], scales: IScale) {
    this.group
      .selectAll("circle")
      .data(origEmb)
      .join("circle")
      .attr("id", (d) => `circle-${d.id.toString()}`)
      .attr("cx", (d) => scales.xScale(d.x))
      .attr("cy", (d) => scales.yScale(d.y))
      .attr("r", 1)
      .attr("fill", (d) => scales.colorScale[d.label])
      .attr("id", (d) => `circle-${d.id.toString()}`);
  }
}

export default OriginalEmbedding;
