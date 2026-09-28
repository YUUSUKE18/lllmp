process.stdin.on("data", (c: Buffer) => {
  const input = c.toString();
  const parts = input.split(',');

  for (const part of parts) {
    if (part.trim() === "") continue;
    const [valueStr, countStr] = part.split(':');
    if (valueStr && countStr) {
      const value = parseInt(valueStr, 10);
      const count = parseInt(countStr, 10);

      if (!isNaN(value) && !isNaN(count) && count >= 0) {
        // 値が重複して出現する可能性があるため、配列に追加
        for (let i = 0; i < count; i++) {
          data.push(value);
        }
      }
    }
  }
});

process.stdin.on("end", () => {
  let totalCount = 0;
  let totalSum = 0;

  for (const val of data) {
    totalCount++;
    totalSum += val;
  }

  console.log(`count=${totalCount} sum=${totalSum}`);
});
