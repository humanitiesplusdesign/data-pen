---
layout: page
title: Interaction: Add a Node
collection: designs
updated: 2016-09-07

---


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