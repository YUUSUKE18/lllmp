const count = 0;
for await (const line of process.stdin) {
    const trimmed = line.trim();
    if (trimmed.length === 0) continue;
    if (/^[0-9]+(?:,[0-9]+)*(?:,)?$/.test(trimmed)) {
        count++;
    }
}
console.log(`valid=${count}`);
