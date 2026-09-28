const lines = process.stdin.read().split('\n');
let validLines = 0;

for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    const parts = trimmedLine.split(',');
    if (parts.length >= 2) validLines++;
}

console.log(`valid=${validLines}`);
