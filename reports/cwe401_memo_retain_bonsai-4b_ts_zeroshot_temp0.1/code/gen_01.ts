const memo: { [n: number]: number } = {};

const process = (input: string): string => {
  const lines = input.trim().split('\n').filter(line => line.trim() !== '');
  let total = 0;

  for (const line of lines) {
    const n = parseInt(line);
    if (isNaN(n)) continue;

    if (n === 1) {
      total += 0;
    } else {
      let steps = 0;
      let current = n;

      while (current !== 1) {
        if (current % 2 === 0) {
          current = current / 2;
        } else {
          current = 3 * current + 1;
        }
        steps++;
      }
      total += steps;
    }
  }

  return `total=${total}`;
};

process.stdin.readLine().then(line => {
  const result = process(line);
  console.log(result);
});
