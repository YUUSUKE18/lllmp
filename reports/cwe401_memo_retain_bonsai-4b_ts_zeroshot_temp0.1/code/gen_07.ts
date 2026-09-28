const memo: { [key: number]: number } = {};

const process = (input: string): string => {
  const lines = input.trim().split('\n');
  let total = 0;

  for (const line of lines) {
    const n = parseInt(line);
    if (isNaN(n) || n <= 0) continue;

    if (n === 1) continue;

    let current = n;
    let steps = 0;

    // 64bit 整数範囲内での計算
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }
      steps++;

      // 32bit 整数の範囲内での計算を避ける
      if (current > 2**31 || current < -2**31) break;
    }

    // 1 に到達するまでの手数をメモ化
    if (memo[n] === undefined) {
      memo[n] = steps;
    }

    total += memo[n];
  }

  return `total=${total}`;
};

const input = process(process.stdin.read());
console.log(input);
