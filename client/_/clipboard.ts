// @ts-nocheck
/* eslint-disable */ // for ESLint
/* tslint:disable */ // for TSLint

// parentElement starts as #root (has no outlet)
// load layout
// append layout to parentElement
// query parentElement for outlet (this will be from the layout we just appended)
// make the oulet we just got the new parentElement
// now load next layout, append it to parentElement (which is now the last layouts outlet)
// query parentElement (last layouts outlet) to get the next outlet down the tree

//TODO: need to know which layouts are already on screen so we don't re render shit
//TODO: ? cache already loaded modules

//* NEW RULE: layout.ts must have page in same  dir level to render

//? keep layout {path, loader} in its own obj for lookup
//? only store layout path in page {} to be used as ref
