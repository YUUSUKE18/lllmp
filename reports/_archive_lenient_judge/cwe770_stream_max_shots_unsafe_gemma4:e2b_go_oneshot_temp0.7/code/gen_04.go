package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力からデータを読み込む
	input, err := os.ReadFile(0) // os.Stdinを直接読み込む
	if err != nil {
		// エラー処理は今回は省略するが、通常はここでエラーを報告する
		return
	}

	// 読み込んだデータを文字列として扱う
	dataStr := string(input)

	// カンマで分割して要素の列を取得
	fields := strings.Split(strings.TrimSpace(dataStr), ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (負の数を考慮しないため、非常に大きな正の数で十分だが、ここでは安全のため-1で初期化し、最初に見つかった値で更新する)
	found := false

	for _, field := range fields {
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue // 空要素は無視
		}

		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			continue // 整数として解釈できないものは無視
		}

		// 要素数をカウント
		count++

		// 最大値を更新
		if !found || n > maxValue {
			maxValue = n
			found = true
		}
	}

	// 結果を厳密に指定された形式で出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
