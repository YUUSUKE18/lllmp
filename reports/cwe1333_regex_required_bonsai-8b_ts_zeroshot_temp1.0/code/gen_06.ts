import { readline } from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter line: ', (line) => {
  // 楼一の正規表現：1個以上の数字列、それぞれカンマで区切られ、末尾のカンマは許容
  const validLine = /^[\s]*([1-9]\d*)\s*(?:,[1-9]\d+)*\s*(?:,|$)/;

  if (validLine.test(line)) {
    console.log(`valid=${line.split(',').filter(Boolean).length}`);
  } else {
    console.log('invalid=0');
  }

  rl.close();
});
