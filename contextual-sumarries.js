function parseInput(input) {
	var results = [];
	var positions = input.split('\n');

	for(var i = 0; i < positions.length; i++) {
      results.push(positions[i].split(','));
	}

	return results;
}

// Input [[6,1],[9,3],[23,5]]
function identifyBoldWords(list) {
	var results = [];
	for (var i = 0; i < list.length; i++) {
		var positions = parseInt(list[i][0]) + parseInt(list[i][1]);
		var pos,
			start = parseInt(list[i][0]);
		for(var j = start; j < positions; j++) {
			if (results.indexOf(j) < 0) {
				results.push(j);
			}
		}		
	}

	return results.sort(function(a, b) {
		return a-b;
		});
}

function writeContext(list, url) {
	var prefixTag = '<b>'
		suffixTag = '</b>';

	var listOfPositions = parseInput('6,1\n8,2\n23,2');
// 	console.log(listOfPositions);

	var positionsOfBoldWords = identifyBoldWords(listOfPositions);

	function readTextDocument(tagName) {
		return document.getElementsByTagName(tagName)[0].innerHTML;
	}

	var textDocument = readTextDocument('body').replace(/[\n\r]/g, ' ');
	var wordsInDocument = textDocument.split(' ');
// 	console.log(wordsInDocument);

	
}

writeContext('Fill your list', 'test1.html')