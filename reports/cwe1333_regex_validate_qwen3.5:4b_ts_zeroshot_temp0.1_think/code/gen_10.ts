const input = process.stdin.read();
if (!input) {
  console.log('valid=0');
  return;
}

const lines = input.toString().split('\n');
let count = 0;

for (const line of lines) {
  const trimmed = line.trim();
  
  // 空行は妥当ではない
  if (trimmed.length === 0) continue;
  
  // 数字とカンマ以外を含む行は妥当ではない
  if (!/^[0-9,]+$/.test(trimmed)) continue;
  
  // 1 個以上の数字列があること（少なくとも 1 つの数字）
  if (!/[0-9]/.test(trimmed)) continue;
  
  count++;
}

console.log(`valid=${count}`);
