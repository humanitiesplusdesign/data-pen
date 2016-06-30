---
layout: page
title: Phase 1 Interaction
collection: designs
updated: 2016-06-30
toc:
- Nomenclature
- Outline
- 1. Adding a node
	- 1.1 No data
	- 1.2 Verify (Authority)
	- 1.3 local upload
	- 1.4 Archive source

---

#Nomenclature  

**VERIFY** To add a URI to a literal, making it a potent and potentially linked data point. For Fibre the term is used most often when we lookup a value in an Authority and then verify against the Authority. This could also happen by matching a value to an Archive source that includes already verified entities.

**LAYERS** 

**STRONGLY IDENTIFIED**  




# Outline  
## Configure
This application is concerned with starting data source selection and configuration. It will include metrics and graphs that convey the shape of potential data sources before we decide which to use.

There will also be a need to map properties from one source to another. Some of this can be done automatically, some will need to be done manually.

The first level options are:  
	1. Skip  
	2. Upload Data  
	3. Define Authorities  
	4. Define Archive sources  
	
**Skip** means skip Configure and go directly to Draw and Explore. It is the option selected when one wants to just use the canvas to sketch a data model without reference to anything else. This experience will be the most similar to Rhizi.

Options 2-4 can be used alone or in any combination. 

Open questions:  

* Uploaded data may or may not include URIs. How do we identify or let the user group attributes that are related. Each record might include a URI for the primary enitity (let's say a person) and a URI for that person's place of birth.
* When we upload data, is there an option to **verify** at that first stage or should this only happen through the canvas? 
	
## Draw and Explore
This application lets us create data and access the data linked or loaded in the Configure phase. For Phase 1, we will use default node types: person, place, event, letter, publication. Custom node types can also be defined when generating new data.

### Display  
The canvas will display node type in layers, by default showing only one entity type at a time. The connections between the nodes are defined by another entity type. This way, each entity-type view represents a different projection of the data. I can look at people connected by places. I can look at people connected by objects (letters, books, etc.). I can look at people connected by events (letters sent/received). I might look at books and see how books are related by place of publication or by people (authors, publishers, etc.)

### Layout  
Layout changes, if necessary should happen slowly and minimizing the change in position of nodes.
The default is a force layout beginning from the first node in the center. Custom layouts (defined by the user dragging or grouping nodes) are saved. Align horizontal, align vertical, and grid layouts can be applied to all or selected nodes. Geospatial layout is available only when looking at the Places node layer.

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

## Enrich
Whereas Configure is oriented to defining the data sources, whether uploaded, linked archives, or authorities, the Enrich application is oriented toward extending the entities in the local dataset with metadata from more sources. There will be some overlap. 

The primary visual model for Enrich is the matrix and the heatmap. We want to see where our current data set is thin and where it is rich. We then want to see how adding from linked sources might help to fill it out and where there are still gaps.

Much more work needs to be done to disambiguate the actions that take place in Configure vs Enrich. 




# 1. Adding a Node

## 1.1 No data
Actions:  
	1. Enter a value > Define node type >  <RETURN> to add node to canvas
	2. Add properties to the record in four ways:
		1. directly in the tabular view
		2. Through "add node" field 
		3. In a pop-up window specific to the node
		4. By drawing a link to another node
	3. Subsequent nodes can be added individually or linked (Rhizi -style) through the prompt field on the canvas. The default node type is the type defined with the first node added.
	
	
## 1.2 Verify (Authority)  
Actions:  
	1. Enter a value > Define node type > Select from matched entities or create new > <RETURN> to enter extend mode.  
	2. if Skip extend: This action will add a new record to the correct node-type table and will add the URI for the selected authority. 
	3. if Extend: An interactive visual interface showing the number of different entity types linked to the entity. Option to select values to add or drill down for more granular selection.

## 1.3 local upload

Let's skip this for now. We need to determine whether or not to verify the entities at upload.
	
## 1.4 Archive source
Actions:  
	1. Enter a value > Define node type > Select from matched entities or create new > <RETURN> to enter extend mode.  
	2. if Skip extend: This action will add a new record to the correct node-type table and will add the URI for the entity in the selected authority and (?) matching URIs for the entity in selected archives. (is this necessary?) 
	3. if Extend: An interactive visual interface showing the number of different entity types linked to the entity. Option to select values to add or drill down for more granular selection. It seems best at this point to ignore the source of the data in this abbreviated extend view. The high level sources have already been selected in Configure. More detailed information about what comes from which source will be available in the Enrich view. 

Note: make it possible to globally remove values by source.

# 2. Switch projections
# 3. Time and Filtering