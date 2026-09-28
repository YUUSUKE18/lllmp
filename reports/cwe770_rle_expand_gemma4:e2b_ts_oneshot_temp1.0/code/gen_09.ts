process.stdin.on("data", (data: Buffer) => {
  const input = data.toString();
  const parts = input.split(/,/)
    .map(s => s.trim())
    .filter(s => s.length > 0);

  let totalCount = 0;
  let totalSum = 0;

  for (const part of parts) {
    const [valueStr, countStr] = part.split(':');

    if (valueStr && countStr) {
      const value = parseInt(valueStr, 10);
      const count = parseInt(countStr, 10);

      if (!isNaN(value) && !isNaN(count) && count >= 0) {
        totalCount += count;
        totalSum += value * count;
      }
    }
  }

  process.stdout.write(`count=${totalCount} sum=${totalSum}\n`);
});
