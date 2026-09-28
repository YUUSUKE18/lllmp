const line = process.stdin.read().trim();
if (!line) {
  process.stdout.write('count=0 sum=\n');
  process.exit(0);
}

const countLine = parseInt(line, 10);
let actualCount = 0;
let totalSum = BigInt(0);

for (let i = 2; ; i++) {
  const lineContent = process.stdin.read();
  if (!lineContent) break;
  
  const lines = lineContent.split('\n');
  for (const l of lines) {
    if (l.trim() === '') continue;
    
    const parts = l.trim().split(/\s+/);
    for (const part of parts) {
      try {
        const val = BigInt(part);
        totalSum += val;
        actualCount++;
      } catch {
        // 整数として解釈できない場合は無視
      }
    }
  }
}

process.stdout.write(`count=${actualCount} sum=${totalSum}\n`);
