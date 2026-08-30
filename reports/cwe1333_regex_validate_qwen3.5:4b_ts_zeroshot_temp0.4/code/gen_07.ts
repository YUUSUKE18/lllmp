import { createInterface } from "readline";

const rl = createInterface({ input: process.stdin, output: process.stdout });

let validCount = 0;

rl.on("line", (line) => {
  const trimmedLine = line.trim();
  
  if (trimmedLine.length === 0) {
    return;
  }

  // 空白のみの行は妥当ではない（仕様：数字とカンマ以外を含む行は妥当ではありません）
  // ただし、trim() で空文字列になった場合は上記で処理済み。
  // 空白のみが含まれている場合、trimmedLine は空文字列になるため、ここは通るが、
  // 元の行が "   " のような場合は trimmedLine が "" になる。
  // 仕様「数字とカンマ以外を含む行」→ 空白は数字やカンマではないので、空白のみでも妥当ではないはずか？
  // しかし、trimmedLine === "" なら上記の if でスキップされる。
  // もし "   ,  " のような場合、trimmedLine は "" になるが、これは空行と同じ扱いになるか？
  // 仕様：「空行、および数字とカンマ以外を含む行は妥当ではありません。」
  // "   ,  " はカンマを含んでいるので、数字とカンマ以外（空白）を含んでいます。
  // しかし、trimmedLine を使うと空文字列扱いになります。
  // より安全に：trim() した後に、数字とカンマ以外の文字が含まれているかチェックする必要がある。
  // または、regex で厳密にチェックする。

  const regex = /^[\s]*(-?[0-9]+)(\s*,\s*(-?[0-9]+))*(\s*,\s*[-]?[0-9]+)?\s*$/;
  
  if (regex.test(trimmedLine)) {
    validCount++;
  } else {
    // 妥当でない行は無視（出力しない）
  }
});

rl.on("close", () => {
  console.log(`valid=${validCount}`);
});
