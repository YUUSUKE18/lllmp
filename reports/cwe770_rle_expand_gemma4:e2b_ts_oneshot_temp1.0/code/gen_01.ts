process.stdin.on("data", (c: Buffer) => {
  const data = c.toString();
  const parts = data.split(',');
  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart.includes(':')) {
      const [valueStr, countStr] = trimmedPart.split(':');
      const value = parseInt(valueStr, 10);
      const count = parseInt(countStr, 10);

      if (!isNaN(value) && !isNaN(count) && count >= 0) {
        for (let i = 0; i < count; i++) {
          process.stdout.write(`${value}\n`);
        }
      }
    }
  }
});
