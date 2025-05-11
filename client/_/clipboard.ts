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
