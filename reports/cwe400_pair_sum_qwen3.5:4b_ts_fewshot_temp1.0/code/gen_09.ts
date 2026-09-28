const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  if (lines.length < 2) {
    console.log("pairs=0\n");
    return;
  }

  const targetStr = lines[0].trim();
  if (!targetStr || isNaN(Number(targetStr))) {
    console.log("pairs=0\n");
    return;
  }

  const target = parseInt(targetStr, 10);

  const nums: bigint[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // 整数として解釈できない行は無視
    const n = parseInt(line, 10);
    if (isNaN(n)) continue;
    
    nums.push(bigintify(n));
  }

  let count = 0n;
  const len = nums.length;
  
  // 2 個の組（位置が異なる）を見つけるため、i < j の範囲でチェック
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      const sum = nums[i] + nums[j];
      if (sum === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}\n`);
});

function bigintify(n: number): bigint {
  return BigInt(n);
}
