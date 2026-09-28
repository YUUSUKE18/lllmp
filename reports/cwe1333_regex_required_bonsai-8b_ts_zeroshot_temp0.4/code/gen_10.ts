const lines = process.stdin.read().split('\n');
const validLines = lines.filter(line => {
    const trimmed = line.trim();
    if (!trimmed) return false;
    const regex = /^(\d+)(?:,\d+)*$/;
    return regex.test(trimmed);
});

const validCount = validLines.length;

console.log(`valid=${validCount}`);
