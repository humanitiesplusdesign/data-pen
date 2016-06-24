---
layout: page
title: Phase 1.1 Diagrams
collection: designs
updated: 2016-06-24
---

# Explore: Add a node
	   

## Scenario 1: Add node and verify against authority
This diagram shows the construction of tabular data when adding a node in Fibra. We start by entering a value and then assign the key to that value. So, if we enter the name "Eetu Mäkelä" we will assign the key "person" to the value. At this stage where there is no archival source attached and no specific ontology referenced we will have the default keys as person, place, thing, and the option to add a custom key. 

EXAMPLE A: The first record shows a node added that is not verified and an unverified property added to that node. For example, we may add "Eetu Mäkelä" identified as a person and we may add that he was "born in" "Finland". This is **cold** data with limited usefulness. 

EXAMPLE B: The second record is a person node, unverified, with a verified property added to it. This is "Eetu Mäkelä" identified as a person and "Finland" the country where he was born, verified as a place. Imagine that we verified Finland as a place by looking it up in GeoNames. In that step we import the Geonames ID for Finland. Now "Eetu Mäkelä" is still cold, but "Finland" is hot. 

EXAMPLE C: In the third example both "Eetu Mäkelä" and "Finland" are **hot** because both have been verified. "Eetu Mäkelä" was verified against the ODECS (Oxford Dictionary of Extraordinary Computer Scientists), so we have added the URI for Eetu in ODECS. 


![Add Node Scenario 1]({{site.urlimg}}designs/Add_node_scenario_1.png)


## Scenario 2: Add node with reference to linked archives.

The Verify step described in Scenario 1 is specifically about finding a match for the value in an authority like VIAF, ULAN, or ODNB for people. Once a key/value pair has been verified, it becomes an entity. While in the tabular view it appears essentially the same, it isn't. It is supercharged. It has gone from **cold** to **hot** becasue we can now extend it with whatever other data is linked to it. 

Adding nodes with reference to linked archives is much like verifying the nodes. If a linked archive has been built well it will link to authorities. And if you know and trust the archive you can choose to let it act as an authority.


![Add Node Scenario 2]({{site.urlimg}}designs/Add_node_scenario_2.png)
