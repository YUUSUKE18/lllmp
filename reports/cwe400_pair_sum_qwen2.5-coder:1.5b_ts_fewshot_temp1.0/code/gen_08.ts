const input = await new Promise<string>((resolve) => {
  const chunks: string[] = [];
  process.stdin.on('data', (chunk) => chunks.push(chunk));
  process.stdin.on('end', () => resolve(chunks.join('')));
});

const target = parseInt(input[0], 10);

const pairs = input.slice(1)
  .filter(Boolean)
  .map((line) => parseInt(line, 10))
  .reduce((acc, num) => {
    const pairs = acc.filter((pair) => pair[0] !== num && pair[1] !== num);
    acc.push([num, num]);
    return pairs;
  }, [])
  .filter((pair) => pair.reduce((sum, num) => sum + num, 0) === target)
  .length;

console.log(`pairs=${pairs}`);
