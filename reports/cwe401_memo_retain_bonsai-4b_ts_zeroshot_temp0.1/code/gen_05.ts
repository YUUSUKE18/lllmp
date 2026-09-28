const memo = new Map<number, number>();

const process = (input: string): string => {
  const lines = input.trim().split('\n');
  let total = 0;

  for (const line of lines) {
    const n = parseInt(line);
    if (isNaN(n) || n <= 0) continue;

    if (memo.has(n)) continue;

    let current = n;
    let steps = 0;

    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;

      // 64bit 整数の範囲内に収まります
      if (current > 2**63) {
        break;
      }
    }

    memo.set(n, steps);
    total += steps;
  }

  return `total=${total}`;
};

process(process.stdin.read()).then(console.log);
