import { stdin } from 'fs';

const input = new ReadStream(stdin);

input.setEncoding('utf8');

let data: string[] | null = null;

if (input.on('error', e => { console.error(e); }) && input.resume()) {
  data = [];
  input.on('data', c => data.push(c));
  input.once('end', () => {
    if (!data) return;
    const str = data.join('').trim();
    const nums = str.split(/[,\s]+/);
    nums.filter(s => !isNaN(Number(s))).forEach(s => {
      let num: number | null = null;
      for (const c of s) {
        if (!Number.isNaN(parseInt(c))) {
          num = parseInt(c, 10);
        } else {
          break;
        }
      }
      if (num) {
        const count = nums.filter(n => n.trim() == String(num)).length;
        const sum = nums.reduce((acc, n) => acc + Number(n), 0);
        console.log(`count=${count} sum=${sum}`);
      }
    });
  });
} else {
  process.exit(1);
}
