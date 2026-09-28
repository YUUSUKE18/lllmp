const input = process.stdin.read().trim();
if (!input) {
    console.log(`valid=0\n`);
    process.exit(0);
}

const lines = input.split('\n');
let count = 0;

for (const line of lines) {
    if (line === '') continue;
    
    let trimmedLine = line.trim();
    if (trimmedLine === '') continue;
    
    const pattern = /^(\s*[-+]?\d+\s*,\s*)*$|\^([-+]?\\d+,)+$|^([^-+]?[0-9]+(,?))?$/, /(^(-?[0-9]+(?:[,\\s]*[0-9]+)*),?$)/;

    if (!trimmedLine.match(/^(\s*[-+]?\d+\s*,\s*)*$|/^([-+]?\\d+,)+$|^([^-+]?[0-9]+(,?))?$/)) {
        continue;
    }
}

console.log(`valid=${count}\n`);
