package main

import (
	"bufio"
	"fmt"
	"io"
)

func main() {
	reader := bufio.NewReader(io.Dedupe(io.MultiReader(&reader))) // 修正: スキップロジックの再考が必要。

	buf, _ := io.ReadAll(reader) // スキipped要素を読み込むのは困難なので、別のアプローチを試みる。

	// 最終的な解法：標準入力から全文字を取得し、処理する
	reader = bufio.NewReader(io.Dedupe(&buf)) 

	var count int64 = -1
	maxVal := int64(-2^63) // 最小の 64bit integer より小さい値（実際には初期化が必要）

	// 入力を読み込むために文字列をループする必要があるが、Go の標準ライブラリのみを使用する場合に最適化しない。

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
