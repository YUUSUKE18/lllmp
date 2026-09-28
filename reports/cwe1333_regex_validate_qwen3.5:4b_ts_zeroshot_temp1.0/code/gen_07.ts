const validCount: number[] = [];

for (const line of process.stdin) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue; // 空行は無視

    let parts: string[] = [];
    try {
        for (const part of trimmedLine.split(',')) {
            const val = Number(part);
            if (!Number.isFinite(val)) {
                validCount.push(false);
                break;
            } else {
                parts.push(String(val));
            }
        }
        
        // 数値が少なくとも一つあるか確認
        if (parts.length > 0) {
            validCount.push(true);
        } else {
            validCount.push(false);
        }
    } catch {
        // part の文字列化や処理で例外が発生した場合、無効と判定
        validCount.push(false);
        break;
    }
}

console.log(`valid=${validCount.filter(Boolean).length}`);
