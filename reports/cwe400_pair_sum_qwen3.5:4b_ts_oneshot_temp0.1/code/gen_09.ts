const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target: number | null = null;
  const nums: number[] = [];

  for (const line of lines) {
    if (line.trim() === "") continue;
    const parts = line.trim().split(/\s+/);
    if (parts.length === 1 && !isNaN(Number(parts[0]))) {
      target = Number(parts[0]);
    } else if (parts.length > 1 || (!isNaN(Number(parts[0])) && parts.some(p => isNaN(Number(p)))) {
      // 2 行目以降の整数列として処理: 空白区切りで分割し、有効な整数のみ取り出す
      for (const p of parts) {
        const n = Number(p);
        if (!isNaN(n)) nums.push(n);
      }
    }
  }

  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
