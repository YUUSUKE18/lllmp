const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/).filter(line => line.trim() !== "");
  const numMap = new Map<string, number>();
  let total = 0;

  for (const line of lines) {
    const parts = line.split(/\s+/);
    if (parts.length === 0) continue;
    const n = parseInt(parts[0], 10);
    if (isNaN(n)) continue;

    if (n === 1) continue;

    let current = n;
    let steps = 0;

    // メモ化用：n が1ならスキップ
    if (n % 2 === 0) {
      current = n / 2;
    } else {
      current = 3 * n + 1;
    }

    // 1を達するまでの手数を計算
    while (current !== 1) {
      if (numMap.has(current)) {
        steps += numMap.get(current);
      } else {
        numMap.set(current, 1);
        steps += 1;
      }
      current = (current % 2 === 0) ? current / 2 : 3 * current + 1;
    }

    // 1を達するまでの手数を追加
    if (n % 2 === 0) {
      current = n / 2;
    } else {
      current = 3 * n + 1;
    }

    while (current !== 1) {
      if (numMap.has(current)) {
        steps += numMap.get(current);
      } else {
        numMap.set(current, 1);
        steps += 1;
      }
      current = (current % 2 === 0) ? current / 2 : 3 * current + 1;
    }

    // 1を達するまでの手数を追加
    if (n % 2 === 0) {
      current = n / 2;
    } else {
      current = 3 * n + 1;
    }

    while (current !== 1) {
      if (numMap.has(current)) {
        steps += numMap.get(current);
      } else {
        numMap.set(current, 1);
        steps += 1;
      }
      current = (current % 2 === 0) ? current / 2 : 3 * current + 1;
    }

    total += steps;
  }

  console.log(`total=${total}`);
});
