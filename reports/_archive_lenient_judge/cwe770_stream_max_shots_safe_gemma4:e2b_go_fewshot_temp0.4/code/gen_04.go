package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile(0) // 標準入力全体を読み込む
	if err != nil {
		return
	}
	data := string(input)

	// カンマで分割して、空白や空文字列を除外する
	parts := strings.Split(strings.TrimSpace(data), ",")

	count := 0
	maxValue := int64(-1e18) // 非常に小さな値で初期化（64bit範囲を考慮）

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数として変換を試みる
		val, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない場合は無視する (仕様に従う)
			continue
		}

		count++
		if val > maxValue {
			maxValue = val
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
