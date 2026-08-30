package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile(0) // 標準入力全体を読み込む（一行だけではないが、後で処理する）
	if err != nil {
		return
	}
	data := string(input)

	// カンマで分割し、空白や空文字列をフィルタリングしながら整数を抽出する
	parts := strings.Split(strings.TrimSpace(data), ",")

	count := 0
	maxValue := int64(-1e18) // 64bitの範囲を考慮して十分小さな値で初期化 (最小値として扱うため、-infinityに相当)

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する (仕様通り)
			continue
		}

		count++
		if num > maxValue {
			maxValue = num
		}
	}

	// 厳密に count=<個数> max=<最大値> の1行を出力する
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
