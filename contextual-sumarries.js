// Test cases:
// 	- valid use case - no overlaping
// 	- nr of words is big (second parameter)
// 	- overlaping of the words
//  - bold word position < 5 beginnig of sentence
//  - bold word position < 5 end of sentence
//  - bold word middle of sentence
//  - bold word1 and word2 on difference < 5

function parseInput(input) {
	var results = [];
	var positions = input.split('\n');

	for(var i = 0; i < positions.length; i++) {
      results.push(positions[i].split(','));
	}

	return results;
}

// Input [[6,1],[9,3],[23,5]]
function checkForOverlappings(list) {

}

function writeContext(list, url) {
	var listOfPositions = parseInput("6,1\n8,1\n23,2");

	var listOfWords = checkForOverlappings(listOfPositions);

	console.log(listOfPositions);
}

writeContext("Fill your list", 'test1.html')