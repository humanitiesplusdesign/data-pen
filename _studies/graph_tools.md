---
layout: page
title: Existing Graph Drawing Tools

---

## [Segrada](http://segrada.org/)
- Not very fluid in interaction
- Uses OrientDB as the backing store
- Has been used to build fairly large networks (large for a single researcher)

## [Rhizi](http://demo.rhizi.net/login)

login: demo@rhizi.net password: demodemo  

- Nicely intuitive and quick in interaction
- The text-based data entry is a compelling approach ("subject  predicate  object")
- Currently broken
- Uses Neo4J as the backing store
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
- Uses Neo4J as the backing store
- We'd want to implement UI differently
  - Literals (properties) vs. Entities (relationships) is not a distinction we probably want to make
  - Schema design should happen implicitly during data entry as much as possible
  - Would need to make effort to adapt to the researcher workflow rather than dictating the UI/workflow from the graph database design

## [Welkin](http://simile.mit.edu/welkin/) ##
- Early tool, visualizes pure RDF graphs
- Interaction between aggregate statistical measure visualization and the graph display (in-bound, out-bound, etc)
- Ability to control contribution of different predicates to the clustering calculation

## [RDF-Studio](http://www.linkeddatatools.com/rdf-studio) ##
- No documentation, so we're passing this over

## [Gravity](http://semweb.salzburgresearch.at/apps/rdf-gravity/user_doc.html)
- Visualization of pure RDF models, some nice graph visualization modification operations
- Visualization and filtering tool, rather than an authoring tool
- Concept of global filters vs. local filters is somewhat interesting
  - Global filters are persistent and we use them to get rid of things we know we aren't interested in
  - Local filters are used to modify what is in the current view, but don't restrict new things that are loaded

## [Callimachus](http://callimachusproject.org/) ##
- More a platform for building Linked Data apps

## [Sgvizler](http://dev.data2000.no/sgvizler/)
- A more limited precursor to VISU
- Pretty much just focused on rendering the output of a SPARQL query
