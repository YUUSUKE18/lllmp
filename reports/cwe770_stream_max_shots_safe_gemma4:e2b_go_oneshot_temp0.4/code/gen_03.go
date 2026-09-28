package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile(0) // 標準入力全体を読み込む（ここでは行単位の処理が複雑になるため、シンプルに全て読み込む）
	if err != nil {
		return
	}
	data := string(input)

	// カンマで分割し、空白を無視して整数を抽出する
	parts := strings.Split(strings.TrimSpace(data), ",")

	count := 0
	maxVal := int64(-1 << 63) // 64bit整数の最小値に近い大きな値で初期化 (負の数も考慮するため)

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		count++
		if num > maxVal {
			maxVal = num
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
