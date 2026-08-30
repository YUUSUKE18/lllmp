const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  let target: bigint | undefined;
  for (const line of lines) {
    if (line.trim() === "") continue;
    try {
      target = BigInt(line.trim());
      break;
    } catch {
      // 目標値として解析できない場合は無視する（ただし仕様は「1 行目に目標値が与えられます」なので、最初の有効な数値行を参照とみなす）
      // もし最初から非数値だった場合の挙動は不特定とするが、通常は数値が入ることを前提とする。
      // 上記の break は一旦抜けて、後で再解析する形ではなく、まずは初期化せずループして取得する方が柔軟。
    }
  }
  
  if (!target) {
    console.log("pairs=0");
    return;
  }

  const nums: bigint[] = [];
  for (const line of lines) {
    if (line.trim() === "") continue;
    try {
      const n = BigInt(line.trim());
      nums.push(n);
    } catch {
      // 整数として解釈できない行は無視
    }
  }

  let count = 0n;
  // 2 つの値 (i, j) を選んで足して目標になる組の数
  // i < j と仮定すると重複なし。ただし、同じ値でも位置が異なる場合は別とする（問題文「位置が異なる 2 個」）。
  for (let i = 0n; i < nums.length - 1n; i++) {
    for (let j = i + 1n; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        count++;
      }
    }
  }

  console.log(`pairs=${count}`);
});
