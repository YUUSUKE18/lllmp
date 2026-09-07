const target = parseInt(process.stdin.readLine()!, 10);
let count = 0;

let seen = new Set<number>();
for (let i = 0; i < target; i++) {
  const num = parseInt(process.stdin.readLine()!, 10);
  if (seen.has(num)) count++;
  seen.add(num);
}

console.log(`pairs=${count}`);
