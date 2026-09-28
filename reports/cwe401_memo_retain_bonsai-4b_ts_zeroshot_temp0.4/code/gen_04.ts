const memo = new Map<number, number>(());

const process = (input: string): string => {
  const lines = input.trim().split(/\r\n|\r|\n|\r/).filter(line => line.trim() !== '');
  let total = 0;

  for (const line of lines) {
    const n = parseInt(line, 10);
    if (isNaN(n) || n <= 0) continue;

    if (n === 1) continue;

    // 仮に1を達にまで繰り返す
    let steps = 0;
    let current = n;

    // メモ化：nを1に至るまでの手数を保存
    if (!memo.has(current)) {
      const next = current % 2 === 0 ? current / 2 : 3 * current + 1;
      memo.set(current, 1 + (current !== 1 ? steps : 0));
      steps = 0;
    }

    // 仮に1を達にまで繰り返す
    while (current !== 1) {
      if (!memo.has(current)) {
        const next = current % 2 === 0 ? current / 2 : 3 * current + 1;
        memo.set(current, 1 + (current !== 1 ? steps : 0));
        steps = 0;
      }
      current = next;
      steps++;
    }
    total += steps;
  }

  return `total=${total}`;
};

const input = process(process.stdin.read());
console.log(input);
