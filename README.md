#A simple Pólya urn model

Here is a simple [Pólya urn](https://en.wikipedia.org/wiki/P%C3%B3lya_urn_model) model : a random draw with reinforcement.

At start time the urn (which is represented by an array) contains a certain amount of each element (here color name).

On each turn, one element is drawn from the urn, and this element plus one of same nature is put back into the urn.

At each turn, elements of same nature are summed up and represented in a graph.

You can initialize the urn with some more color names.

[Example here](http://rouage.fr/polya/)