---
layout: page
title: The Four Components
collection: designs
updated: 2016-09-07

---


## 1. Configure
This application is concerned with starting data source selection and configuration. It will include metrics and graphs that convey the shape of potential data sources before we decide which to use.

There will also be a need to map properties from one source to another. Some of this can be done automatically, some will need to be done manually.

The first level options are:  

1. **Skip**  
2. **Select a pre-configured data set**
3. Define Authorities  
4. Define Archive sources  
	
**Skip** means skip Configure and go directly to Draw and Explore. It is the option selected when one wants to just use the canvas to sketch a data model without reference to anything else. This experience will be the most similar to Rhizi.

## 2. Select/Load

Filter the configured sources and/or upload a data set locally and filter.

* Converting uploaded table to rdf
* Verify and reconciliation will need to be part of this step 

![select_filters]
The Select app has intergrated filter visualizations based on dates, geolocation data, and source. We may look to more sophisticated filtering of relationships using an alluvial graph in the future.

![select_matrix]
The matrix is configurable by entity type and source to show the number of different properties per entity and the number of values per property+source.
	
## 3. Construct (Draw and explore)
This application lets us create data and access the data linked or loaded in the Configure phase. For Phase 1, we will use default node types: person, place, event, letter, publication. Custom node types can also be defined when generating new data.

### Display  
The canvas will display node type in layers, by default showing only one entity type at a time. The connections between the nodes are defined by another entity type. This way, each entity-type view represents a different projection of the data. I can look at people connected by places. I can look at people connected by objects (letters, books, etc.). I can look at people connected by events (letters sent/received). I might look at books and see how books are related by place of publication or by people (authors, publishers, etc.)

### Layout  
Layout changes, if necessary should happen slowly and minimizing the change in position of nodes.
The default is an expanding grid layout beginning from the first node in the center. Custom layouts (defined by the user dragging or grouping nodes) are saved. Align horizontal, align vertical, and grid layouts can be applied to all or selected nodes. Geospatial layout is available only when looking at the Places node layer.

### Size and Color  
By default we minimize the use of color. A single color will be used to mark one or more nodes. The size of nodes and weight of links can be applied to show centrality measures, in-degree, out-degree, betweeness and eigenvector.

### Node/Link Editing  
These actions (defined previously for Idiographic tool) include:  

1. REMOVE one or more nodes or links from the display and from the tabular view. This does not delete those records from the local dataset, but flags them as removed.
2. GROUP This action may be temporary or permanent. Temporarily, it adds the same tag to a set of nodes so that they can be clustered or filtered as a group. Permanently the group defines a new entity that all the grouped nodes are linked to.
3. MARK We may want to mark one or more nodes (or links?) in order to follow them through different layouts.  
4. MERGE/UNMERGE Combine two nodes into one. This can be used in a curatorial mode to reconcile two entities that are the same. This can also be used in a research mode (temporary) to look at the effects on the graph if two entities are combined and their links are combined. Conflicts or duplications of time and place are allowed. Friends and secretaries can often act as surrogates for another. In this case it can be useful to consider the network as if these two (or more people) have one social network.

### Graph Selection
From one or more nodes, we want to make it easy to select all directly linked nodes, then connections at the second degree and third degree. Select the union of two networks, the intersection of two networks. The REMOVE action above should be applied to the selection or the inverse. 

## 4. Enrich/Extend
Whereas Configure is oriented to defining the data sources, whether uploaded, linked archives, or authorities, the Enrich application is oriented toward extending the entities in the local dataset with metadata from more sources. There will be some overlap. 

The primary visual model for Enrich is the matrix and the heatmap. We want to see where our current data set is thin and where it is rich. We then want to see how adding from linked sources might help to fill it out and where there are still gaps.

Much more work needs to be done to disambiguate the actions that take place in Configure vs Enrich. 



[select_filters]: {{ site.baseurl }}/assets/designs2/Fibra.002.png
{: height="500px" width="600px"}

[select_matrix]: {{ site.baseurl }}/assets/designs2/Fibra.002.png
{: height="500px" width="600px"}

