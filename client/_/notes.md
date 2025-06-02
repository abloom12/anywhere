# Thoughts on mobile table design

- could make each row a card? this is my least favorite

- hybrid accordion table layout. as we run out of space the column leaves table and goes inside table row.
- most tables on small screens would have 2-3 columns of data in row then rest would live in accordion body.

- could truncate the text on some columns
- word wrapping
- hide less important columns

# Dir Architecture

How should I handle my global store and the fetch calls that populate it?
example issue:

I have a bunch of fetch calls related to consumer groups, but one of those fetch calls needs to be global and its data needs stored globally so it can be used globally.

How would you break these files up? pull that one fetch call into its own feature? then leave the rest in another one?
