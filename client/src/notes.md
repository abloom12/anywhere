- add layout logic to router \ outlets
- await loader on link hover \ debonce for like 200ms

- we call await loader() THEN
- we grab pageclass THEN
- we start prefetch THEN
- we mount page THEN

- prefetch should be sent to web worker so mount can continue
- should do at least one more request ID check
- IF ^ check calls for abort we need to make sure we abort the prefetch if it has been started
- so im thinking we should do request ID check right after we start prefetch
