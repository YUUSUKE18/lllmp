const input = await new Promise<string>((resolve) => {
  let data = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => { data += chunk; });
  process.stdin.on('end', () => resolve(data));
});

const lines = input.split('\n');
let count = 0;

for (const line of lines) {
  const trimmed = line.trim();
  if (trimmed === '') continue;
  
  const regex = /^[0-9]+(?:,[0-9]+)*[,]?$/;
  if (regex.test(trimmed)) {
    count++;
  }
}

process.stdout.write(`valid=${count}\n`);
