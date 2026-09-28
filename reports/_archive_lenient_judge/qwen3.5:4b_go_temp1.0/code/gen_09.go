package main

import (
	"bufio"
	"fmt"
)

func main() {
	scanner := bufio.NewScanner(stdin)
	sumStrs := map[string]int{} // 用いて unique integers に対応する配列を作成。key は文字列の表現、val を count と sum の組として保持し、重複を処理し合計を計算します。

	var elements []int32
	for scanner.Scan() {
		inputLine, _ := scanner.ReadBytes('\n')
		line = string(inputLine)[:len(line)-1] // 末尾の改行削除
		
// 文字列分割する
parts := splitIntegers(line)

for _, part := range parts {
	valStr := strings.TrimSpace(part)
	if len(valStr) == 0 || !isDigitString(valStr) {
		continue // 空要素や整数として解釈できない要素はスキップします。

val, err := strconv.ParseInt(valStr, 10, 32)
if err != nil {
continue
}

sum += val + int64(sumStrs[key]) // unique integers の count と sum を取得する処理を実行します。
count++ } else if _, ok := map[string]int; exists{key}, _ = strconv.Atoi(strings.TrimSpace(val)); len(key) > 0, false { return nil }, false: return valString}

fmt.Println(fmt.Sprintf("count=%d sum=%d", count, sum)) // unique integers の個数と合計を標準出力します。
} else if !ok { fmt.Fprintf(os.Stdout, "%s\n", formatSum(str)) }
}
