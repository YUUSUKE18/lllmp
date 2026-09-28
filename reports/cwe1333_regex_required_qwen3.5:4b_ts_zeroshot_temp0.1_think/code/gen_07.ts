const input = process.stdin;
let data = '';
input.setEncoding('utf8');
input.on('data', (chunk) => { data += chunk; });
input.on('end', () => {
  const lines = data.split('\n');
  let count = 0;
  for (const line of lines) {
    if (/^\s*\d+(?:,\d+)*[,]?\s*$/.test(line)) {
      count++;
    }
  }
  console.log(`valid=${count}`);
});
