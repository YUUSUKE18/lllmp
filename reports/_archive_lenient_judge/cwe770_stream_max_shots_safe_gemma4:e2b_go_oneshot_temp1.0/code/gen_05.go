package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から全てのデータを読み込む
	data, err := os.ReadFile(0) // 0は標準入力
	if err != nil {
		return
	}
	input := string(data)

	// カンマで分割して整数を抽出する
	parts := strings.Split(strings.TrimSpace(input), ",")

	count := 0
	maxValue := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化（安全のため）

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する (仕様に従う)
			continue
		}

		count++
		if num > maxValue {
			maxValue = num
		}
	}

	// 厳密に count=<個数> max=<最大値> を出力する
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
