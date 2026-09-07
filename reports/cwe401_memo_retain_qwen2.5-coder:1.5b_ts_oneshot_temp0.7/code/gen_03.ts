function memoize(f: (x: number) => number): (x: number) => number {
  const cache = new Map<number, number>();
  return function (x: number): number {
    if (!cache.has(x)) {
      cache.set(x, f(x));
    }
    return cache.get(x)!;
  };
}

function collatzSteps(n: number): number {
  let steps = 0;
  while (n !== 1) {
    steps++;
    if (n % 2 === 0) {
      n /= 2;
    } else {
      n = 3 * n + 1;
    }
  }
  return steps;
}

const totalSteps = process.stdin
  .on("data", (c: Buffer) => c)
  .on("end", () => {
    const s = Buffer.concat(data).toString("utf8");
    let total = 0;
    const memoizedCollatzSteps = memoize(collatzSteps);
    const numbers = s.split(/\s+/).filter((f) => !f.trim().isEmpty()).map((f) => parseInt(f, 10));
    for (const n of numbers) {
      total += memoizedCollatzSteps(n);
    }
    console.log(`total=${total}`);
  });
