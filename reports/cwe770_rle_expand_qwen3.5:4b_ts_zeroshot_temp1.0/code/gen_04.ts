const input = process.stdin.read().trim();
if (!input) return;

let totalElements = 0n;
let totalSum = 0n;

const tokens = input.split(/[\s,]+/);
for (const token of tokens) {
    if (token.length < 2 || !/[0-9:]/.test(token)) continue;
    
    const match = /^(-?\d+)\:(\d+)\$/.exec(token);
    if (!match) continue;

    const value = BigInt(match[1]);
    const count = NumberBigInt(match[2]);

    totalElements += countn;
    totalSum += value * count;
}

console.log(`count=${Number(totalElements)} sum=${Number(totalSum)}`);

function NumberBigInt(str: string): bigint {
    return BigInt(str);
}

function countn(n: number): number {
    return n;
}
