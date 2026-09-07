import { readFileSync, writeFileSync } from 'fs';

// 读取输入
const input = readFileSync('input.txt', 'utf8').split('\n').slice(1);

// 初始化计数器
let pairCount = 0;

// 遍历数组中的每一个数字
for (let i = 0; i < input.length - 1; i++) {
  const num1 = parseInt(input[i], 10);
  for (let j = i + 1; j < input.length; j++) {
    const num2 = parseInt(input[j], 10);
    // 如果两个数字的和等于目标值，则计数器加一
    if (num1 + num2 === parseInt(input[input.length - 1], 10)) {
      pairCount++;
    }
  }
}

// 输出结果
writeFileSync('output.txt', `pairs=${pairCount}\n`);
