function reverse(string) {
  return string.split("").reverse().join("");
}

function average(array) {
  return array.reduce((a, b) => a + b, 0) / array.length;
}

module.exports = { reverse, average };
