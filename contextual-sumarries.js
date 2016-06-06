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

	// Sort the positions to avoid overlapping of the intervals
	var sortedResults = results.sort(function(a, b) {
			return a - b;
		});

	var i = 0;
	var tempResults,
		results = [];
	while(i < sortedResults.length) {
		tempResults = [];
		tempResults.push(sortedResults[i]);
		while(sortedResults[i + 1] == sortedResults[i] + 1) {
			i++;
			tempResults.push(sortedResults[i]);
		} 
		results.push(tempResults);
		i++;
	}

	return results;
}

function isAnyOfNextFiveWords(positions, position) {
	var howMany = 5;
	return positions.filter(function(value) {
		return value <= position + 5;
	}).length;
}

function boldWord(textWord) {
	var prefixTag = '<b>'
		suffixTag = '</b>';
	return prefixTag.concat(textWord).concat(suffixTag);
}

// Add words before bold word until reaches point or five words 
function addWordsBefore(wordsInDocument, position) {
	var howMany = 5; 
	var results = [];

	// It might be the begining of the phrase
	if (position < howMany) {
		howMany = position;
	} 
	for(var i = 1; i <= howMany; i++) {
		if (wordsInDocument[position - i].indexOf('.') > 0) {
			break;
		} 

		results.unshift(wordsInDocument[position - i]);
	}

	return results;
}

// Add words after bold word until reaches point or five words or any other bold word
function addWordsAfter(summary, wordsInDocument, position, until) {
	var howMany = 5; 

	for(var i = 1; i <= howMany; i++) {
		if (position + i > until) {
			break;
		}
		summary.push(wordsInDocument[position + i]);
		if (wordsInDocument[position + i].indexOf('.') > 0) {
			break;
		}
	}

	return summary;
}

function writeContext(list) {
	// Parse the input (list) and if the intervals overlap then I try to fix the problem
	// Result: An array of continuos positions 
	var positionsOfBoldWords = identifyBoldWords(parseInput(list));

	function readTextDocument(tagName) {
		return document.getElementsByTagName(tagName)[0].innerHTML;
	}

	// Get the text from page
	var textDocument = readTextDocument('body').replace(/[\n\r]/g, ' ');
	var wordsInDocument = textDocument.split(' ');

	var position;
	var setOfPositions;
	var partialWords = [];
	var summaryWords = [];
	var totalNumberOfWords = wordsInDocument.length;
	
	var j = 0;
	while(j < positionsOfBoldWords.length) {
		setOfPositions = positionsOfBoldWords[j];

		var i = 0;
		while(i < setOfPositions.length) {
			position = setOfPositions[i];
			if (position > totalNumberOfWords) {
				break;
			} 

			// Surround the word with bold tags
			if (j == 0) {
				partialWords = addWordsBefore(wordsInDocument, position);	
			}
			
			partialWords.push('<b>');
			while(i < setOfPositions.length) {
				partialWords.push(wordsInDocument[position + i]);
				i++;
			}
			partialWords.push('</b>');
			if (positionsOfBoldWords.length > 1 && j < positionsOfBoldWords.length - 1) {
				partialWords = addWordsAfter(partialWords, wordsInDocument, position, positionsOfBoldWords[j + 1][0] - 1);	
			} else if (j == positionsOfBoldWords.length - 1) {
				partialWords = addWordsAfter(partialWords, wordsInDocument, position + i - 1, position + i + 5);
			}
		}

		Array.prototype.push.apply(summaryWords, partialWords);
		
		partialWords = [];
		j++;
	}

    var text = ''; 
	for (var i = 0; i < summaryWords.length; i++) {
		text += summaryWords[i] + ' ';
	}

    var div = document.createElement('div');
    var text = document.createTextNode(text);
    div.appendChild(text);   

    var parentInPage = document.getElementsByTagName('body').parentNode;
    document.body.insertBefore(div, parentInPage);
}

// I am aware writeContext method requires two arguments. I cannot load the content from an external url because of CORS security.
// Please, call it as below.
writeContext('2,1\n5,2');