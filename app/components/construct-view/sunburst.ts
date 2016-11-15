namespace fibra {
  export class Sunburst {
    private sbRadius = 200
    private sbGroup: d3.Selection<d3.BaseType, {}, null, undefined>
    private lessRadius: number = this.sbRadius * this.sbRadius / 3 - 12 * 12
    private sbArc = d3.arc<any, d3.HierarchyRectangularNode<any>>()
        .startAngle((d: d3.HierarchyRectangularNode<any>) => { return d.x0 })
        .endAngle((d: d3.HierarchyRectangularNode<any>) => { return d.x1 })
        .innerRadius((d: d3.HierarchyRectangularNode<any>) => { return Math.sqrt(d.y0 - this.lessRadius) })
        .outerRadius((d: d3.HierarchyRectangularNode<any>) => { return Math.sqrt(d.y1 - this.lessRadius) });
    private sbPart = d3.partition()
        .size([2 * Math.PI, this.sbRadius * this.sbRadius])
    private sbColor = '#aaa'
    private sbTooltip: d3.Selection<HTMLDivElement, {}, HTMLBodyElement, undefined>

    constructor($element: angular.IAugmentedJQuery) {
      this.sbTooltip = d3.select('body').append<HTMLDivElement>('div')
        .style('position', 'absolute')
        .style('z-index', '20')
        .style('background-color', 'gray')
        .style('color', 'white')
        .style('padding', '3px')
        .style('border-radius', '2px')
        .style('visibility', 'hidden')

      // Typescript messes with `this` depending on caller. Override.
      this.buildSunburst = this.buildSunburst.bind(this)
    }

    public addSunburstGroup(sel) {
      if(this.sbGroup) this.sbGroup.remove()
      this.sbGroup = sel.append('g')
        .classed('sunburst-overlay', true)
    }

    public buildSunburst(d, i, g) {
      this.sbGroup.attr('transform', (d: IExploreItem) => { return 'translate(' + d.gx + ',' + d.gy + ')' })

      // Group by property type -> property value
      let hier = d3.hierarchy(d, (node) => {
        if(node.localProperties) {
          // Root node
          return node.localProperties
        } else {
          // Property node
          return node.values
        }
      })

      hier.sum((d) => { return d.values === undefined && d.localProperties === undefined ? 1 : 0; });

      let part = this.sbPart(hier)

      let paths = this.sbGroup.selectAll("path")
        .data(hier.descendants(), (d:d3.HierarchyRectangularNode<any>) => { return d.data })
      paths.exit().remove()
      paths.enter()
        .filter((d) => { return d.depth > 0 })
          .append("path")
          .on('mouseover', (d: d3.HierarchyNode<IExploreItem>, i: number) => {
            this.sbTooltip.style('top', (d3.event.pageY - 10) + 'px')
              .style('left', (d3.event.pageX + 10) + 'px')
              .style('visibility', 'visible')
              .text(d.data.label.value)
          })
          .on('mouseout', () => {
            this.sbTooltip.style('visibility', 'hidden')
          })
        // .attr("display", function(d) { return d.depth ? null : "none"; }) // hide inner ring
        .merge(paths)
          .attr("d", this.sbArc)
          .style("stroke", "#fff")
          .style("fill", this.sbColor)
          .style("fill-rule", "evenodd")    
    }
  }
}