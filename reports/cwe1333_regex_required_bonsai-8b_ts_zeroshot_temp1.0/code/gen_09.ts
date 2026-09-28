const input = process.stdin.read().trim();
const validLine = /^(\d+(?:,\d+)*|,\d+)$/.test(input);

if (validLine) {
  console.log(`valid=${input.split(',').length}`);
} else {
  console.log('invalid');
}
