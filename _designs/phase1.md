---
layout: page
title: Phase 1 Plan
collection: designs
---

In Phase 1 we are going to focus efforts on importing a single entity from a Linked Data store. We will work out the challenges of querying, presenting the ontology to users, and making selection/addition clean, elegant and intuitive.

The chart below shows where this step fits within the required set of tasks and functionalities with existing tools.

![Chart/matrix for Fibra development]({{site.urlimg}}{{page.collection}}/Fibra_planning.001.png)

The reasoning behind this focus is that while all of the outlined tasks are in the end necessary, there already exist reasonably adequate tools for most of these tasks, when done in bulk and in a manner focused on just one of them in turn.

However, when locally exploring data, these activities need to be much more fluidly integrated to support the end goal of being able to think through the data. This is also why, while there are tools for some of the individual local tasks, they are not adequate for our goal.

# Case studies #

## Early Modern Correspondence

Based on [EMLO](http://demo.seco.tkk.fi/saha/project/index.shtml?model=emlo) we will limit query to one of the following three entity types:
 * Person
 * Place
 * Letter

Of particular interest to us:
 * Rich modeling of dates using CIDOC-CRM, including different types of uncertainty
 * Well thought out data model
 * The EMLO database also contains rich prosopographical data in a rich event-based model to expand to.

## Procope

The [Procope](http://demo.seco.tkk.fi/saha/project/index.shtml?model=procope) database includes letter data from [Electronic Enlightenment](http://www.e-enlightenment.com/) and the [D'Alembert](http://dalembert.academie-sciences.fr/) corpus, as well as person categorization data by researchers at Stanford.

Of particular interest to us:
 * Overlapping data of the same type with EMLO
 * Additional person categorization data of the type we want to support in creating

## Six Degrees of Francis Bacon

Using the [Linked Data conversion](http://demo.seco.tkk.fi/saha/project/index.shtml?model=sdfb) of the [original database](http://www.sixdegreesoffrancisbacon.com/).

Of particular interest to us:
 * Single object type (people), but rich relations with attendant source and confidence annotations (=complex model for relationships)

## Schoenberg Database of Manuscripts

The [Linked Data conversion](http://demo.seco.tkk.fi/saha/project/index.shtml?model=shoenberg) ([data model](https://docs.google.com/drawings/d/1lZHqRw_rFlbnWytL6olSXE-mKS2HJqic5debjH7__bw/edit)) of the [Schoenberg Database of Manuscripts](http://dla.library.upenn.edu/dla/schoenberg/index.html) contains rich information on the passage of books through auctions and owners.

Of particular interest to us:
 * Event-based data model with two different, but connected types of events: transition events such as auctions and donations, as well as possession events

# Tool design

## Remote endpoint configuration

 * Configure remote endpoints to source data from
 * Load/save ready made configurations
 * Select classes to show/hide
 * Select properties to globally hide (globally/by class?)
 * Change display order of properties?

## Local schema configuration
 * Filter/change display order of properties
 * Select classes to show/hide?

## Main view
 * Class tree view / Faceted query / Text query view
 * Result list+edit view / table view / graphical+edit view

## Bulk edit actions
 * Change values to resources (e.g. convert all *birth places* to instances of Location)
 * Extract properties (e.g. convert all references to *Author* or *Scholar* in the generic *tags* to *occupation* properties)

# Notes

[Images and notes captured during workshops]({{site.baseurl}}/designs/phase1_notes/)