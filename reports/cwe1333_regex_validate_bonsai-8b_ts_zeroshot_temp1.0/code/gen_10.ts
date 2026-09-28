const lines = process.stdin.read().split('\n');
let validLineCount = 0;

lines.forEach(line => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;
    
    const parts = trimmedLine.split(',');
    if (parts.length >= 2) {
        validLineCount++;
    }
});

console.log(`valid=${validLineCount}`);
