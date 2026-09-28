const line1 = process.stdin.readline() || '';
const line2 = process.stdin.readline() || '';

const count = parseInt(line1) || 0;
const sum = 0;

if (count > 0) {
  const lines = process.stdin.read().split('\n');
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line && !isNaN(line)) {
      sum += parseInt(line);
    }
  }
}

console.write(`count=${count} sum=${sum}\n`);
