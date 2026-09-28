const count = [];
for await (const line of process.stdin) {
  if (/^\s*(\d+)(?:,\d+)*(?:,\s*)?$/.test(line)) {
    count.push(1);
  }
}
console.log(`valid=${count.length}`);
