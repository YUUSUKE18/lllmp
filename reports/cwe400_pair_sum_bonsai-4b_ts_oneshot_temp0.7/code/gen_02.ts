const target = parseInt(process.stdin.readline().trim());
const pairs = 0;
let a, b;
for (let i = 0; i < process.stdin.lines(); i++) {
  const line = process.stdin.readline().trim();
  if (!line || isNaN(line)) continue;
  const n = parseInt(line);
  if (n === target) {
    if (a === undefined || b === undefined) {
      a = n;
      b = undefined;
    } else {
      if (a !== target && b !== target) {
        pairs++;
      }
      if (b !== undefined && b !== target) {
        b = n;
      } else {
        a = undefined;
        b = undefined;
      }
    }
  } else if (a === undefined && b === undefined) {
    a = n;
    b = undefined;
  } else if (a !== undefined && b !== undefined) {
    if (a === target && b === target) {
      a = undefined;
      b = undefined;
    } else if (a === target || b === target) {
      a = undefined;
      b = undefined;
    } else if (a !== target && b !== target) {
      pairs++;
    }
  }
}
console.log(`pairs=${pairs}`);
