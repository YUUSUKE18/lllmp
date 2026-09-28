let input = "";
process.stdin.setEncoding("utf8");

process.stdin.on("data", (data: string) => {
  input += data;
});

process.stdin.on("end", () => {
  const parts = input.trim().split(',');
  let totalCount = 0;
  let totalSum = 0;

  for (const part of parts) {
    if (!part) continue;
    const match = part.match(/(\d+):(\d+)/);
    if (match) {
      const value = parseInt(match[1], 10);
      const count = parseInt(match[2], 10);
      
      if (!isNaN(value) && !isNaN(count) && count >= 0) {
        totalCount += count;
        totalSum += value * count;
      }
    }
  }

  console.log(`count=${totalCount} sum=${totalSum}`);
});
