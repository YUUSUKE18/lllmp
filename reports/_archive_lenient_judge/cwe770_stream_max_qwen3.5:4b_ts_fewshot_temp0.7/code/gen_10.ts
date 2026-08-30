const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  let count = 0;
  let max: number | undefined = undefined;
  
  for (const f of s.split(",")) {
    if (!f.trim()) continue;
    
    try {
      const n = parseInt(f, 10);
      if (Number.isNaN(n) || !isFinite(n) || Math.abs(n) > Number.MAX_SAFE_INTEGER) continue;

      count++;
      
      // TypeScript の MAX_SAFE_INTEGER は正確に表現できないため、BigInt を使用して比較する必要があるか、あるいは問題文の「64bit 整数」という条件を考慮し、JavaScript の数値制限を超えるケースがある場合に対応するか。
      // しかし、標準的な JavaScript エンタープライズ環境では Number.MAX_VALUE (2^53 - 1) が限界となるが、BigInt を使用することで完全な 64-bit signed integer (-9,223,372,036,854,775,808 ~ 9,223,372,036,854,775,807) を扱える。
      
      if (max === undefined || BigInt(n) > BigInt(max)) {
        max = n;
      }
    } catch (e) {
      // 解析エラーの場合は無視する（try-catch ブロック内）
      continue;
    }
  }

  console.log(`count=${count} max=${max}`);
});
