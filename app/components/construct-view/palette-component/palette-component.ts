namespace fibra {
  'use strict'

  interface IPaletteItem extends Item {
    typeValue: string
    typeLabel: string
  }

  type ItemLeaf = {
    'label': string,
    'items': IPaletteItem[],
    'expanded': boolean
  }
  type ItemBranch = {
    'key': string,
    'value': ItemLeaf
  }
  type ItemTree = d3.Map<ItemLeaf>

  interface IPaletteScope extends angular.IScope {
    loadCSV
  }

  export class PaletteComponentController {

    private divSel: d3.Selection<HTMLDivElement, {}, null, undefined>
    private nodeDrag: d3.Selection<SVGSVGElement, {}, null, undefined>
    private circles: d3.Selection<d3.BaseType, IPaletteItem, SVGSVGElement, {}>
    private types: d3.Selection<d3.BaseType, ItemBranch, HTMLDivElement, {}>
    private tooltip: d3.Selection<HTMLDivElement, {}, HTMLBodyElement, undefined>
    private items: IPaletteItem[]
    private paletteWidth: number
    private paletteHeight: number
    private paletteSearchHeight: number = 40
    private typeColorScale: d3.ScaleOrdinal<string, string> = d3.scaleOrdinal(d3.schemeCategory20c)
    private labelFilter: string = ''
    private typeItemTreePromise: angular.IPromise<ItemTree>
    private typeItemTree: ItemTree = d3.map<ItemLeaf>()
    private typeForCreation: string

    public constructor( private fibraService: FibraService,
                        private configurationService: ConfigurationService,
                        private $element: angular.IAugmentedJQuery,
                        private sparqlItemService: SparqlItemService,
                        private sparqlTreeService: SparqlTreeService,
                        private $scope: IPaletteScope,
                        private $q: angular.IQService,
                        private FileSaver: any) {

      $scope.loadCSV = this.loadCSV.bind(this)

      this.typeItemTree.set('', {
        label: 'No type defined',
        items: [],
        expanded: false
      })
      this.query()
    }

    public query(): angular.IPromise<ItemTree> {
      return this.typeItemTreePromise = this.sparqlItemService.getAllItems().then((items: IPaletteItem[]) => {
        return this.mergeItems(this.items, items)
      })
    }

    public $postLink(): void {
      this.divSel = d3.select(this.$element[0]).select<HTMLDivElement>('div.palette')
      this.nodeDrag = d3.select(this.$element[0]).select<SVGSVGElement>('.palette-node-drag')
      this.nodeDrag.style('display', 'none')
      this.nodeDrag.append('circle')

      this.divSel
        .style('height', '100%')
        .style('width', '100%')

      this.tooltip = d3.select('body').append<HTMLDivElement>('div')
        .style('position', 'absolute')
        .style('z-index', '20')
        .style('background-color', 'gray')
        .style('color', 'white')
        .style('padding', '3px')
        .style('border-radius', '2px')
        .style('visibility', 'hidden')

      let onChangeFunction = () => {
        return this.query().then(this.build.bind(this)).then(() => { return 'Done' })
      }

      this.fibraService.on('change', onChangeFunction)

      this.typeItemTreePromise.then((itemTree) => {
        this.build.bind(this)(itemTree)
      })
    }

    public addItem(item: IPaletteItem, coordinates?: [number]) {
      let itemTypeKey: string = item.typeValue
      let itemType: TreeNode = this.fibraService.getState().construct.types.filter((t) => { return t.id === itemTypeKey })[0]
      let chosenTypes: TreeNode[] = this.fibraService.getState().construct.displayTypes
      if (!chosenTypes[0] && itemType) {
        this.fibraService.dispatchAction(this.fibraService.setOrderedTypes([itemType]))
      } else if (!chosenTypes[1] && itemType && (chosenTypes[0] !== itemType)) {
        let newTypes: TreeNode[] = chosenTypes.concat([])
        newTypes.push(itemType)
        this.fibraService.dispatchAction(this.fibraService.setOrderedTypes(newTypes))
      }
      return this.fibraService.dispatchAction(this.fibraService.displayItem(item, coordinates)).then((state) => {
        this.fibraService.dispatch('change')
        return state
      })
    }

    public createItem(label: string): void {
      let node: INode = DataFactory.instance.namedNode(label)
      this.fibraService.dispatchAction(this.fibraService.createItem(node)).then(() => {
        this.query().then((items) => {
          this.build.bind(this)(items)
        })
      })
    }

    public uploadCSV(datum: ItemBranch): void {
      this.typeForCreation = datum.key
      $('#dataModelSelector').click();
    }

    public downloadCSV(datum: ItemBranch): void {
      let blob: Blob = new Blob(
        [ d3.csvFormat(
          datum.value.items.map((d) => {
            return {
              [SKOS.prefLabel.value]: d.localProperties.filter((p) => p.value === SKOS.prefLabel.value)[0].values[0].value,
              FibraId: d.value
            }
          }),
          [SKOS.prefLabel.value, 'FibraId']
        ) ],
        { type: 'application/csv;charset=utf-8' }
      )
      let filename: string = datum.value.label + '.csv'
      this.FileSaver.saveAs(blob, filename)
    }

    public loadCSV(file): void {
      // Notes: column headers we should handle
      //  - 'FibraId' - this will be the matching Fibra identifier. In this case we should not createItem
      //              but rather update an existing item if necessary
      //  - SKOS.prefLabel.value - Will be the label to use
      //  - 'Match' - will be the Recon matched value and should go to OWL.sameAs property
      //  - 'Notes' - will do onto a notes property?


      // Just uses the first column of the file as labels
      let reader: FileReader = new FileReader();
      reader.onload = () => {
        let parsedCSV = d3.csvParse(reader.result)
        let newRows: d3.DSVRowString[] = parsedCSV.filter((row) => {
          return !row['FibraId']  // Not an update
        })
        let labelColumnKey = parsedCSV.columns[0]
        let proms: angular.IPromise<State>[] = [
          newRows.length > 0 ? this.fibraService.dispatchAction(
            this.fibraService.createItems(
              newRows.map((row) => {
                console.log(row)
                let node: INode = DataFactory.instance.namedNode(row[labelColumnKey])
                return node
              }),
              this.typeForCreation
            )
          ) : this.$q.resolve(this.fibraService.getState()),
          this.$q.all(parsedCSV.filter((row) => {
            return !!row['FibraId']
          }).map((row) => {
            if(row['Match'] && !row[OWL.sameAs.value]) {
              row[OWL.sameAs.value] = row['Match']
              delete row['Match']
            }
            let entries = d3.entries(row)
            let props: PropertyToValues<INode>[] = entries
              .filter((entry) =>  entry.key !== 'FibraId'
                                  && entry.value
                                  && entry.key !== OWL.sameAs.value
                                  && entry.key !== 'Notes'
                                  && entry.key !== 'Match')
              .map((entry) => {
                let prop: PropertyToValues<INode> = new PropertyToValues(DataFactory.instance.namedNode(entry.key))
                prop.values.push(
                  entry.value.indexOf('http://') === 0 ?
                  DataFactory.instance.namedNode(entry.value) :
                  DataFactory.instance.literal(entry.value)
                )
                return prop
              })
            // Handle OWL.sameAs
            entries
              .filter((entry) => entry.key === OWL.sameAs.value && entry.value)
              .forEach((entry) => {
                let prop: PropertyToValues<INode> = new PropertyToValues(DataFactory.instance.nodeFromNode(OWL.sameAs))
                prop.values.push(DataFactory.instance.namedNode(entry.value))
                props.push(prop)
              })
            console.log(props)
            return this.fibraService.dispatchAction(
              this.fibraService.itemProperty(
                new NamedNode(row['FibraId']),
                props
              )
            )
          })).then((states: State[]) => states[states.length - 1])
        ]

        this.$q.all(proms).then(() => {
          this.query().then((items) => {
            this.build.bind(this)(items)
          })
        })
      };
      reader.readAsText(file.files[0]);
      // We need to clear the input so that we pick up future uploads. This is *not*
      // cross-browser-compatible.
      file.value = null;
    }

    public build(itemTree: ItemTree) {
      this.updateSizing()
      let itemTreeFiltered = itemTree.entries().filter((d) => d.key !== '')
      let items: IPaletteItem[] = itemTreeFiltered.reduce(
        (a: IPaletteItem[], b: ItemBranch) => {
          return a.concat(b.value.items)
        },
        []
      )
      let padding: number = items.length > 300 ? items.length > 2000 ? 1 : 2 : 4
      let paletteHeightLessTypes = this.paletteHeight - (itemTreeFiltered.length * 25)
      let rawRadius: number = (Math.sqrt(this.paletteWidth * paletteHeightLessTypes / items.length) - padding) / 2
      let radius: number = rawRadius > 8 ? 8 : rawRadius
      let xOffset: number = radius * 2 + padding / 2
      let yOffset: number = radius * 2 + padding / 2
      let xDots: number = Math.floor((this.paletteWidth) / xOffset) - 1

      // Bring the node drag SVG and the addItem function local
      let nodeDrag = this.nodeDrag
      let addItem = this.addItem.bind(this)
      let paletteWidth = this.paletteWidth

      this.types = this.divSel
        .selectAll('div.type')
          .data(itemTreeFiltered, (d: ItemBranch) => d.key )
      this.types.exit().remove()
      let typesDivsEnter = this.types.enter()
        .append('div')
          .classed('type', true)
          .classed('inverse-icon', true)
          .text((d) => d.value.label)

      typesDivsEnter
        .append('span')
          .classed('glyphicon', true)
          .classed('glyphicon-download', true)
          .on('click', (d) => this.downloadCSV(d))

      typesDivsEnter
        .append('span')
          .classed('glyphicon', true)
          .classed('glyphicon-upload', true)
          .on('click', this.uploadCSV.bind(this))

      typesDivsEnter
        .append('span')
          .classed('glyphicon', true)
          .classed('expand-button', true)
          .on('click', (d) =>  {
            d.value.expanded = !d.value.expanded
            this.typeItemTreePromise.then(this.build.bind(this))
          })

      typesDivsEnter
        .append('svg')
          .attr('width', '100%')

      this.types = typesDivsEnter
        .merge(this.types)

      this.types.selectAll('.expand-button')
        .classed('glyphicon-resize-small', (d: ItemBranch) => d.value.expanded)
        .classed('glyphicon-resize-full', (d: ItemBranch) => !d.value.expanded)

      this.types.selectAll('svg')
        .style('display', (d: ItemBranch) => d.value.expanded ? 'block' : 'none')

      let typeSvgs = this.types.select('svg')
         .attr('height', (d) => {
           return (Math.ceil(d.value.items.length / xDots) + 1) * yOffset
          })

      this.circles = typeSvgs
        .selectAll('circle.item')
          .data((d) => d.value.items, (d: IPaletteItem) => d.value )

      this.circles.exit().remove()

      this.circles = this.circles.enter()
        .append('circle')
          .classed('item', true)
          .attr('r', radius)
          // .on('click', this.addItem.bind(this))
          .on('mouseover', (d: IPaletteItem, i: number) => {
            this.tooltip.style('top', (d3.event.pageY - 10) + 'px')
              .style('left', (d3.event.pageX + 10) + 'px')
              .style('visibility', 'visible')
              .text(d.label.value + ' (' + d.typeLabel + ')')
          })
          .on('mouseout', (d: IExploreItem, i: number) => {
            this.tooltip.style('visibility', 'hidden')
          })
          .call(d3.drag<SVGElement, IPaletteItem, SVGCircleElement>()
            .on('start', function(d) {
              let thisCircle: d3.Selection<SVGElement, {}, null, undefined> = d3.select(this)
              nodeDrag
                .style('display', 'block')
              nodeDrag.select('circle')
                .classed('item', thisCircle.classed('item'))
                .attr('r', thisCircle.attr('r'))
                .attr('fill', thisCircle.attr('fill'))
                .attr('transform', 'translate(8,8)')
              nodeDrag
                .style('left', d3.event.sourceEvent.clientX - 8)
                .style('top', d3.event.sourceEvent.clientY - 8)
            })
            .on('drag', function(d) {
              nodeDrag
                .style('left', d3.event.sourceEvent.clientX - 8)
                .style('top', d3.event.sourceEvent.clientY - 8)
            })
            .on('end', function(d) {
              // If the cursor is on the canvas, display
              let exploreContainer: Element = d3.select<Element, any>('#explorecontainer').node()
              if (
                d3.event.sourceEvent.clientX > exploreContainer.getBoundingClientRect().left &&
                d3.event.sourceEvent.clientX < exploreContainer.getBoundingClientRect().right &&
                d3.event.sourceEvent.clientY > exploreContainer.getBoundingClientRect().top &&
                d3.event.sourceEvent.clientY < exploreContainer.getBoundingClientRect().bottom
              ) {
                addItem(
                  d3.select<SVGElement, IPaletteItem>(this).datum(),
                  [
                    d3.event.sourceEvent.clientX - exploreContainer.getBoundingClientRect().left,
                    d3.event.sourceEvent.clientY - exploreContainer.getBoundingClientRect().top
                  ]
                ).then(() => {
                  nodeDrag.style('display', 'none')
                })
              } else {
                nodeDrag.style('display', 'none')
              }
            }))
        .merge(this.circles)
          .call(this.update.bind(this))

      this.circles
        .transition()
          .attr('fill', (d: IPaletteItem) => this.typeColorScale(d.typeValue))
          .attr('transform', (d, i) => { return 'translate(' + ((i % xDots) + 1) * xOffset + ',' + (Math.floor(i / xDots) + 1) * yOffset + ')'})
    }

    public update(circles: d3.Selection<d3.BaseType, IPaletteItem, SVGSVGElement, {}>) {
      let c: d3.Selection<d3.BaseType, IPaletteItem, SVGSVGElement, {}> = circles ? circles : this.circles

      c .classed('displayed', (d: IPaletteItem) => this.fibraService.getState().construct.itemIndex[d.value] ? true : false)
        .classed('filtered', (d: IPaletteItem) => this.labelFilter && !(d.label.value.toUpperCase().indexOf(this.labelFilter.toUpperCase()) !== -1))
    }

    private updateSizing(): void {
      this.paletteWidth = Math.round(window.innerWidth * 0.15) // this.svgSel.node().clientWidth
      this.paletteHeight = Math.round(window.innerHeight) - this.paletteSearchHeight
      this.divSel.style('height', this.paletteHeight + 'px')
    }

    private mergeItems(oldItems, newItems: IPaletteItem[]) {
      // Wipe old items (bad, but temporary)
      this.typeItemTree.values().forEach((v) => {
        v.items = []
      })

      newItems.forEach((item) => {
        let typeProp: IPropertyToValues<INodePlusLabel> = item.localProperties.filter((p) => p.value === RDF.type.value)[0]
        if (typeProp && typeProp.values[0]) {
          item.typeValue = typeProp.values[0].value
          item.typeLabel = typeProp.values[0].label.value

          // Add type to the type map
          if (!this.typeItemTree.has(item.typeValue)) {
            this.typeItemTree.set(item.typeValue, {
              label: item.typeLabel,
              items: [item],
              expanded: true
            })
          } else {
            this.typeItemTree.get(item.typeValue).items.push(item)
          }
        } else {
          item.typeValue = ''
          item.typeLabel = 'No type defined'
        }
      })
      // Sort by label
      this.typeItemTree.values().forEach((v) => {
        v.items.sort((a: IPaletteItem, b: IPaletteItem) => a.label.value === b.label.value ? 0 : a.label.value > b.label.value ? 1 : -1)
      })
      return this.typeItemTree
    }
  }

  export class PaletteComponent implements angular.IComponentOptions {
    public templateUrl: string = 'components/construct-view/palette-component/palette-component.html'
    public controller: string = 'PaletteComponentController'
  }
}
