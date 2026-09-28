process.stdin.on("data", (c: Buffer) => {
  const input = c.toString();
  const parts = input.split(',');
  for (const part of parts) {
    const trimmedPart = part.trim();
    if (trimmedPart.includes(':')) {
      const [valueStr, countStr] = trimmedPart.split(':');
      const value = parseInt(valueStr, 10);
      const count = parseInt(countStr, 10);

      if (!isNaN(value) && !isNaN(count) && count >= 0) {
        for (let i = 0; i < count; i++) {
          process.stdout.write(value + " ");
        }
      }
    }
  }
  process.stdout.write("\n");
});
