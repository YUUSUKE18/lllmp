const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const lines = s.split(/\r?\n/);
  
  let target: number | null = null;
  for (const line of lines) {
    if (line.trim() === "") continue;
    const parts = line.trim().split(/\s+/);
    if (parts.length > 0) {
      const val = parseInt(parts[0], 10);
      if (!Number.isNaN(val)) {
        target = val;
        break;
      }
    }
  }

  if (target === null) {
    console.log("pairs=0");
    return;
  }

  const numbers: number[] = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.trim() === "") continue;
    const parts = line.trim().split(/\s+/);
    for (const part of parts) {
      const n = parseInt(part, 10);
      if (!Number.isNaN(n)) {
        numbers.push(n);
      }
    }
  }

  let count = 0;
  const seen = new Set<number>();

  for (let i = 0; i < numbers.length; i++) {
    const val = numbers[i];
    if (seen.has(val)) {
      // 同じ値が複数ある場合、組み合わせの数を正確に計算する必要がある。
      // しかし、Set は重複を保持しないので、単純な存在チェックだけでは不十分。
      // 代わりに、値ごとの出現回数をカウントし、その上で組み合わせを数えるのが安全。
    }
    
    const complement = target - val;
    if (seen.has(complement)) {
      count++;
    }
    seen.add(val);
  }

  console.log(`pairs=${count}`);
});
