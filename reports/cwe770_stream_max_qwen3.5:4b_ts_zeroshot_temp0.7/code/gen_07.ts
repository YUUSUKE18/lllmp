const input = process.stdin.read();
if (!input) {
    console.log('count=0 max=' + Number.MIN_SAFE_INTEGER);
} else {
    const tokens = input.split(/[\s,]+/).map(Number);
    let count = 0;
    let max: number | null = null;

    for (const val of tokens) {
        if (!Number.isNaN(val)) {
            count++;
            if (max === null || val > max) {
                max = val;
            }
        }
    }

    // 要素がない場合、問題文の「整数として解釈できない要素も無視します」により空配列とみなすか、または最小値を出力するか。
    // 「最大値」という要件があるため、存在しない場合は Number.MIN_SAFE_INTEGER (Integer.MIN_VALUE) が適切。
    // ただし、標準的な論理的な挙動としては「定義されていません」が出力できないので、MIN_SAFE_INTEGER でデフォルトとするのが安全です。
    const finalMax = max !== null ? max : Number.MIN_SAFE_INTEGER;

    console.log('count=' + count + ' max=' + finalMax);
}
