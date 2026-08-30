const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = 0;
  let max = -Infinity;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = Number(trimmedPart);
    
    // 整数として解釈できるか、かつ64bit範囲内かを確認する（JavaScriptのNumber型はIEEE 754倍精度で安全だが、ここでは明示的にチェック）
    if (!isNaN(num) && isFinite(num) && num >= -2**53 && num <= 2**53 - 1) { // 64bit整数範囲の目安として安全に扱う
      count++;
      if (num > max) {
        max = num;
      }
    }
  }

  console.log(`count=${count} max=${max}`);
});
