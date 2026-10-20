const nums = process.stdin.read().split(',').map(n => n.trim()).filter(n => /^\d+$/.test(n));
const unique = [...new Set(nums)];
const count = unique.length;
const sum = unique.reduce((a, b) => a + parseInt(b), 0);
console.log(`count=${count} sum=${sum}`);
