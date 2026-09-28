const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let target: number | null = null;
  for (const line of lines) {
    if (line.trim() === "") continue;
    const val = parseInt(line, 10);
    if (!Number.isNaN(val)) {
      target = val;
      break;
    }
  }

  if (target === null) {
    console.log("pairs=0");
    return;
  }

  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") continue;
    const val = parseInt(line, 10);
    if (!Number.isNaN(val)) {
      nums.push(val);
    }
  }

  let count = 0n;
  const n = nums.length;
  
  // 2 点探索法またはハッシュマップ法。
  // 入力サイズが巨大な場合、O(N) のアルゴリズムが必要。
  // 値の範囲が 64bit なので、ハッシュマップ（Set）を使うのが適切。
  // ただし、負の数を含むため、Set を直接使うと符号問題が発生しないか確認が必要。
  // JavaScript の Set は数値をキーとして扱う際、厳密な等価性チェックを行うが、
  // 浮動小数点の誤差などはない（整数のみ）。
  
  const seen = new Set<number>();
  for (const num of nums) {
    const needed = target - num;
    if (seen.has(needed)) {
      count++;
    }
    seen.add(num);
  }

  console.log(`pairs=${count}`);
});
