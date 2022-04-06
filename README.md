# Apple Music API Consumer
A React SPA for consuming the Apple Music API

## Scenario

Write an SPA that contains a search field, and a list of five elements underneath. It should look roughly
like this:

Per default the list should show A, B, C, D, E.

Every second the elements should rotate by one position:

B C D E A

C D E A B

D E A B C

When the user types into the search field, query the apple music API like this: https://itunes.apple.com/search?term=radiohead. 

The output contains a list with songs. Each song
has a property "collectionName" (the album). Sort all albums alphabetically and take the first five. E.g.
“A Moon Shaped Pool“, „In Rainbows“, “Kid A”, “OK Computer”, “Pablo Honey”.

The list should keep rotating with a 1 second interval and the new albums should be added from bottom
to top:

Items from previous searches should not appear again, but only the current search term items should be
rotated.

### Running from Docker

docker build -t davidzambo/apple-music-api-consumer .

docker run -itd -p 8080:80 davidzambo/apple-music-api-consumer
