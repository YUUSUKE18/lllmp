const memo: { [key: number]: number } = {};

const process = (input: string) => {
  const lines = input.trim().split('\n');
  let total = 0;

  for (const line of lines) {
    const n = parseInt(line);
    if (isNaN(n) || n <= 0) continue;

    if (n === 1) continue;

    let current = n;
    let steps = 0;

    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }

      if (current > 600000000000000000) break; // 64-bit 600000000000000000 は安全に上回る
      steps++;
    }

    total += steps;
  }

  memo[n] = steps;
  return total;
};

const input = process(process.stdin.read());
console.log(`total=${input}`);
