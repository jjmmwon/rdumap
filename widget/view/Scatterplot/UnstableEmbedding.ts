import type { IScale, IOriginalPoint } from "@/model";
import * as d3 from "d3";

class UnstableEmbedding {
  private group: d3.Selection<SVGGElement, undefined, null, undefined>;
  private show: boolean = true;

  constructor(parent: d3.Selection<SVGGElement, undefined, null, undefined>) {
    this.group = parent.append("g").attr("class", "unstableEmbedding");
  }

  render(
    unstEmb: IOriginalPoint[],
    scales: IScale,
    onUnstableClick: (id: number) => void
  ) {
    const { xScale, yScale, colorScale } = scales;

    this.group
      .selectAll("path")
      .data(unstEmb)
      .join("path")
      .attr("d", d3.symbol(d3.symbolCross).size(100))
      .attr("transform", (d) => `translate(${xScale(d.x)},${yScale(d.y)})`)
      .attr("fill", (d) => colorScale[d.label])
      .attr("pointer-events", "all")
      .attr("stroke", "black")
      .attr("stroke-width", 1.5)
      .attr("visibility", this.show ? "visible" : "hidden")
      .attr("id", (d) => `unstPoint-${d.id.toString()}`)
      .on("click", (event, d) => {
        event.stopPropagation();
        onUnstableClick(d.id);
      });
  }

  setVisibility(show: boolean) {
    this.show = show;

    if (this.show) {
      this.group
        .selectAll("path")
        .attr("visibility", "visible")
        .attr("pointer-events", "all");
    } else {
      this.group
        .selectAll("path")
        .attr("visibility", "hidden")
        .attr("pointer-events", "none");
    }
  }
}

export default UnstableEmbedding;
