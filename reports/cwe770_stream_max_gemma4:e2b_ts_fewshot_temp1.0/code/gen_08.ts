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

    const num = parseInt(trimmedPart, 10);

    // 整数として解釈可能か、かつ64bit整数に収まるかを確認（ここではparseIntの範囲を信じるが、安全のため）
    if (!isNaN(num)) {
      // 数値が64bit整数に収まるという制約はNode.jsのNumber型で十分満たされるため、そのまま比較する
      count++;
      if (num > max) {
        max = num;
      }
    }
  }

  console.log(`count=${count} max=${max}`);
});
