const input = process.stdin.read();

if (!input) {
    process.exit(0);
}

const tokens = input.split(/[\s,]+/).map(Number);

const uniqueNumbers: number[] = [];
for (let i = 0; i < tokens.length; ) {
    if (tokens[i] !== undefined && !isNaN(tokens[i])) {
        const val = tokens[i];
        let exists = false;
        for (let j = 0; j < uniqueNumbers.length; j++) {
            if (uniqueNumbers[j] === val) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            uniqueNumbers.push(val);
        }
    }
    i++;
}

const count = uniqueNumbers.length;
let sum: number | undefined = undefined;
for (const n of uniqueNumbers) {
    if (sum === undefined || Number.isFinite(sum + n)) {
        sum += n;
    } else {
        break;
    }
}

if (!Number.isFinite(sum)) {
    console.log('count=0 sum=');
} else {
    process.stdout.write(`count=${count} sum=${sum}\n`);
}
