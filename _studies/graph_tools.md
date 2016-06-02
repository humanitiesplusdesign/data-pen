---
layout: page
title: Existing Graph Drawing Tools

---

## [Segrada](http://segrada.org/)
- Not very fluid in interaction
- Self-contained, so no real access to underlying database
- Has been used to build fairly large networks (large for a single researcher)

## [Rhizi](http://demo.rhizi.net/login)

login: demo@rhizi.net password: demodemo  

- Nicely intuitive and quick in interaction
- The text-based data entry is a compelling approach ("subject  predicate  object")
- Currently broken
- Method for choosing "type" of a node is fairly powerful approach
- We really like the ability to author information in a purely textual/keyboard-based approach

## [gFacet, RelFinder, SemLens, tFacet](http://www.visualdataweb.org/tools.php)  
- These are all nicely designed from an interaction perspective
- RelFinder looks for paths linking chosen entities in a database
- SemLens visualizes data and then allows the definition of "lens" that test the data, and allows composition of lenses
- gFacet allows the definition of complex queries
  - Example "Find all football players who play for teams with home stadium capacity >50000"
  - In most cases this is not necessary. Can just project the propery of interest (home stadium capacity) directly onto the entity (football player) and expose it as a facet.
- tFacet

## [Sylva](http://sylvadb.com/)
- Data entry relatively clunky
- Full-featured modeling capabilities
- Schema modeling, data entry, analysis
- We'd want to implement UI differently
  - Literals (properties) vs. Entities (relationships) is not a distinction we probably want to make
  - Schema design should happen implicitly during data entry as much as possible
  - Would need to make effort to adapt to the researcher workflow rather than dictating the UI/workflow from the graph database design

## [Welkin](http://simile.mit.edu/welkin/) ##
- Early tool, visualizes pure RDF graphs
- 

## [RDF-Studio](http://www.linkeddatatools.com/rdf-studio) ##


## [Gravity](http://semweb.salzburgresearch.at/apps/rdf-gravity/user_doc.html) 
- visualization of pure RDF models, some nice graph visualization modification operations

## [Information Workbench](http://iwb.fluidops.com) ##


## [Callimachus](http://callimachusproject.org/) ##
- more a platform for building Linked Data apps 


## [Sgvizler](http://dev.data2000.no/sgvizler/)
- a more limited precursor to VISU
