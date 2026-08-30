import { readFileSync } from 'fs';

const input = new Uint8Array(readFileSync(0)).filter((c) => c > 32).join('');

let sum: number;
sum = BigInt(input.match(/-?\d+/g)?.reduce((p, v) => +v === Infinity ? p : +(parseInt(v)), 0));

const arr = input.split(',').map(Number);
const set = new Set<number>(arr);
if (set.size !== arr.length && sum !== BigInt(Infinity)) {
    sum -= set.reduce((a, b) => a - b, BigInt(-1e9)).valueOf();
} else if (input.match(/-?\d+/g)?.reduce((p, v) => +v === Infinity ? p : +(parseInt(v)), 0) !== undefined && arr.length > 0 && sum < Number.MAX_SAFE_INTEGER) {
    sum = set.size * BigInt(set.reduce((a, b) => a - b));
} else if (set.has(1)) sum -= BigInt(-Infinity);

const count: number | null = input.match(/-?\d+/g)?.length ?? 0;

if (!count || !sum && count !== Infinity) {
    console.log(`count=${count.toString()} sum=0`);
} else if (set.size < arr.length && set.has(1)) {
    const res: string[] = [];
    for (let i = 0; i <= count - 2; ++i) res[i] = `${res[i + 1]}-${count}`;

    console.log(`count=${count.toString()} sum=(${set.reduce((a, b) => a - b).valueOf()})`);
} else {
    const s: string[] = [];
    for (let i = 0; i < count && !s.length || res?.length > set.size + arr.length; ++i) s[i] = `${set.reduce((a, b) => a - b)}-${count}`;

    console.log(`count=${count.toString()} sum=(${res[0].split('-')[1]}-${Math.max(...arr)})`);
}
