const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  // 目標値の取得（1 行目）
  let target: number | null = null;
  if (lines.length > 0) {
    const trimmed = lines[0].trim();
    if (trimmed !== "") {
      target = parseInt(trimmed, 10);
    }
  }

  // 整数列の取得（2 行目以降）
  const nums: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    const n = parseInt(line, 10);
    if (!Number.isNaN(n)) {
      nums.push(n);
    }
  }

  // 足して目標値になる組の数を求める
  let count = 0n;
  if (target !== null && nums.length >= 2) {
    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        const sum = BigInt(nums[i]) + BigInt(nums[j]);
        if (sum === BigInt(target)) {
          count++;
        }
      }
    }
  }

  console.log(`pairs=${count}`);
});
