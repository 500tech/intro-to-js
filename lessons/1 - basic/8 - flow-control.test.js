const sentence = 'This is a sentence that has a few words.'; // don't change this line please :)

const sentenceWordCount = sentence.split(' ').length;
// If this sentence has more 3 words, print 'long'. Print 'short' otherwise.
console.log(sentenceWordCount > 3 ? 'long' : 'short');

if (false) {
  console.log("Make sure this isn't printed, without deleting this line!");
}

// print all numbers between 4 and 11, inclusively (each on a new line)
for (let i = 4; i <= 11; i++) {
  console.log(i);
}
