const data: Buffer[] = [];
let memo: Map<number, number> = new Map();
const process = require('process').stdin;

process.stdin.on('data', (c: Buffer) => {
  data.push(c);
});
process.stdin.on('end', () => {
  const s = Buffer.concat(data).toString('utf8');
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== '');
  let total = 0;

  for (const line of lines) {
    const n = parseInt(line, 10);
    if (isNaN(n)) continue;

    if (memo.has(n)) {
      total += memo.get(n);
      continue;
    }

    let current = n;
    let steps = 0;
    const max = Infinity;

    // 64bit 整数範囲で計算
    while (current !== 1) {
      if (current % 2 === 0) {
        current = current / 2;
      } else {
        current = 3 * current + 1;
      }

      // 避ける循环を止めるため、極限を安全に確認（3n+1が很大になる可能性）
      if (current > 64 || current < 0) {
        break;
      }
      steps++;

      // 空白・空行を無視（`split(/\s+/)`で空行も含めない）
      current = current.toString();
      const currentStr = current.split(/\s+/).filter(s => s.trim() !== '');
      const nextStr = currentStr[0] ? currentStr[0] : '';
      if (!nextStr) break;

      // インパクトをメモ化
      memo.set(current, steps);
    }

    if (memo.has(1)) {
      steps = memo.get(1);
    }

    total += steps;
  }

  console.log(`total=${total}`);
});
