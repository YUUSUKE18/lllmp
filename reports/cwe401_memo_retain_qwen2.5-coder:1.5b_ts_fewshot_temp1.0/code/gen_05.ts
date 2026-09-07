interface Memo {
  [key: string]: number;
}

function memoize(func: (input: number) => number): (input: number) => number {
  const memo: Memo = {};
  return function (input: number) {
    if (memo.hasOwnProperty(input)) return memo[input];
    let result = func(input);
    memo[input] = result;
    return result;
  };
}

const memoizedFib = memoize((input: number): number => {
  if (input === 0) return 0;
  if (input === 1) return 1;
  return memoizedFib(input - 1) + memoizedFib(input - 2);
});

const input = process.stdin.read();
let total = 0;

for (const line of input.split("\n")) {
  const n = parseInt(line.trim(), 10);
  if (Number.isNaN(n)) continue;
  total += memoizedFib(n);
}

console.log(`total=${total}`);
