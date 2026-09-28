package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	input, _ := os.ReadFile(0) // 標準入力全体を読み込む
	s := string(input)

	// カンマで分割し、前後の空白を取り除く
	parts := strings.Split(strings.TrimSpace(s), ",")

	count := 0
	maxValue := int64(-1e18) // 十分大きな負の値で初期化 (int64の範囲内を考慮)

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		num, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		count++
		if num > maxValue {
			maxValue = num
		}
	}

	// 全ての要素が処理されたか確認（空の入力の場合など）
	if count == 0 {
		fmt.Println("count=0 max=-1") // 空の入力に対する適切な出力（最大値は定義しないため）
		return
	}

	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
