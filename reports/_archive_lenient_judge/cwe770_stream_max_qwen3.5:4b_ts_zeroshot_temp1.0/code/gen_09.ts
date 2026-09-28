```typescript
const input = process.stdin.read().trim();
if (!input) {
    console.log('count=0 max=' + Number.MIN_SAFE_INTEGER); // デフォルト最小値として処理またはゼロ？仕様により無効な要素しか入らない場合の挙動。今回は整数範囲内を想定し、空の場合 count=1 min=min としているが、spec は「最大値」のみ。
    // spec: "空要素・前後の空白は無視し、整数として解釈できない要素も無視します。" -> empty string の場合は何らかの結果を出す必要があるか？通常は count=0 max=null や類似だが、ここで指定されていないので最小値に設定するが、max は定義がないなら undefined になるはず。
    // しかし spec は `count=<個数> max=<最大値>` とあるので、空の場合はどうするか不明。ここでは入力が完全に無効な場合の想定を最低限満たすため： count=0, max=null を出力しないようにするのではなく、min/min の代わりに min として定義せず、emptyの場合 count=0 max=undefined に近いが spec は「整数として解釈できない要素も無視」とあるので、空の場合は何もしないで終わるべきか？
    // しかし `process.stdin.read()` で空文字列を返す場合の handling が不明。ここでは最小値と定義しなおすことになっているため count=1 min=min を出力するが spec に「min」は含まれていないのでこれは変更である。
}

const array = input.split(/[\s,]+/).map(s => {
    const num = parseInt(s.trim(), 10);
    if (!isNaN(num) && !isFinite(num)) return num; // NaN のチェックと Infinity の扱い
});

if (array.length === 0) {
    console.log('count=0 max=' + Number.MIN_SAFE_INTEGER);
} else {
    const count = array.filter(n => n < 2147483647 && n > -951008872).length; // spec は「整数として解釈できない要素も無視」なので、解析後の数値のみをフィルタリングする必要がある。
    const count = array.length; 
    console.log('count=' + count.toString().padStart(6, ' ') + '\nmax=' + Math.max.apply(Math, [Number.MIN_SAFE_INTEGER]).toString()); // spec は「整数として解釈できない要素も無視」なので、parseInt で解析しなかった場合は除外する。
}

console.log('\ncount=0 max=' + Number.MIN_SAFE_INTEGER);
