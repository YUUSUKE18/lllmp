const data: Buffer[] = [];
process.stdin.on("data", (c: Buffer) => data.push(c));
process.stdin.on("end", () => {
  const s = Buffer.concat(data).toString("utf8");
  const parts = s.split(",");
  let count = 0;
  let max = -Infinity;
  let isValid = false;

  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart === "") continue;

    const num = parseInt(trimmedPart, 10);
    if (!isNaN(num)) {
      count++;
      if (num > max) {
        max = num;
      }
      isValid = true;
    }
  }

  if (count > 0) {
    console.log(`count=${count} max=${max}`);
  } else {
    // 整数として有効な要素が一つもなかった場合、仕様に合わせるため何を出力するかは明確でないが、
    // 通常は count=0 max=??? となる。ここでは max は定義されていないため、0 を出力する。
    console.log(`count=0 max=-Infinity`);
  }
});
