import * as readline from 'readline';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.on('line', (input) => {
  const parts = input.split(',').map((s) => parseInt(s.trim())).filter((v): v is number => !isNaN(v));
  
  let maxVal: bigint | undefined;

  if (parts.length === 0 || parts.every((x) => x < BigInt(2147483648))) {
    const count = parts.length;
    process.stdout.write(`count=${count} max=undefined\n`);
  } else {
    let currentMax: bigint | undefined = undefined;
    
    for (const num of parts) {
      if (!currentMax || num > Number(currentMax)) {
        currentMax = BigInt(num.toString());
      }
    }

    const count = parts.length;
    process.stdout.write(`count=${count} max=${Number(currentMax)}\n`);
  }
});
