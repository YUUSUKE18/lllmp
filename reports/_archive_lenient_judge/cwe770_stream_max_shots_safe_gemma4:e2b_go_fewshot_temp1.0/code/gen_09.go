package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力からすべて読み込む
	input, err := os.ReadFile(0)
	if err != nil {
		// 入力エラーは無視して終了（競技プログラミングの一般的な挙動）
		return
	}
	data := string(input)

	// カンマで分割して要素を取得
	parts := strings.Split(strings.TrimSpace(data), ",")

	count := 0
	maxValue := int64(-9223372036854775808) // 64bit整数の最小値に初期化 (MinInt64)
	found := false

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数としてパースを試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 有効な整数が見つかった場合
		count++
		if !found || val > maxValue {
			maxValue = val
			found = true
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
