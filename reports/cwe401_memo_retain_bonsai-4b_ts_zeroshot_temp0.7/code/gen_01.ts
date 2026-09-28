const memo = new Map<number, number>;

const process = (input: string): string => {
  const lines = input.trim().split(/\n/).filter(line => line && !isNaN(line));
  let total = 0;

  for (const line of lines) {
    const n = parseInt(line);
    if (isNaN(n) || n <= 0) continue;

    let steps = 0;
    const current = n;

    // 1 まで到達するまでの手数をメモ化
    if (memo.has(current)) {
      steps = memo.get(current);
    } else {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps = 1 + steps;
      // メモ化処理
      memo.set(current, steps);
    }

    total += steps;
  }

  return `total=${total}`;
};

process(process.stdin.read()).console.log();
