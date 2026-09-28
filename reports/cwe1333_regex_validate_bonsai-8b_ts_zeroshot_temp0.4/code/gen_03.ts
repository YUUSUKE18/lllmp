const lines = process.stdin.read().split('\n');
const validLines = lines
  .filter(line => {
    const trimmed = line.trim();
    if (!trimmed) return false;
    const parts = trimmed.split(',');
    return parts.length >= 1;
  });

console.log(`valid=${validLines.length}`);
