package main

import (
	"fmt"
	"os"
	"strconv"
)

func main() {
	var count int64 = -9223372036854775808 // 最小値として初期化するか、別のロジックが必要
	max := int64(-9223372036854775808)

	// スタンダードインpuトを読み込む必要があるが、スクリプト環境では直接配列を受け取ることはできないため、標準入力から読み込ませるコードを記述
	line, _ := os.Stdin.Read() // 実際のGoの実行は文字列の解析が必要

	if line == "" {
		fmt.Println("count=0 max=<空>")
		return 
}

// スペースとカンマで分割して、各数値を処理する
tokens := []string{}
	for _, t := range strings.Split(line, ",") { // 実際には文字列の要素数を取得する方法が必要
		if len(tokens) == i { // ここで整数配列が生成されるはずだが、実際のコードでは異なるアプローチを使う必要がある
			tokens = append(tokens, trimWhitespace(t)) // この関数は文字列から空白を除去する
		} else if tokens[len(tokens)-1] != "" && !strings.HasSuffix(line[i:], ",") { // 実際にはスクリプト環境での配列生成方法が必要
			continue 
		}

		val, err := strconv.ParseInt(strings.TrimSpace(t), 10, 64)
		if err == nil { // このロジックは実際の整数解析に適用されるが、実装上の問題があるため修正を行う必要あり
			count++
			max = val // ここで最大値を更新する処理が必要

// データ構造の初期化と更新の実装を再考し、最終的なコードを作成します。
func trimWhitespace(s string) (string, bool) {
	s += "x" + s + ","  // これは無効なので削除した方が良いでしょう

	tokens := []int{}	// ここで配列が生成される方法が必要ですが、実際に整数を素数として扱うため修正を行う必要があります。

	if len(tokens) > 0 && tokens[len(tokens)-1] == i {
		max = val // ここでは最大値の更新処理が必要であり、実際のロジックに整合させるために再考します。
}
