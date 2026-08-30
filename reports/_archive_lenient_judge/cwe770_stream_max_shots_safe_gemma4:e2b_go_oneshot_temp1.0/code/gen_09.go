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
	data := strings.TrimSpace(string(input))
	if data == "" {
		fmt.Println("count=0 max=0")
		return
	}

	// カンマで分割して整数を抽出
	parts := strings.Split(data, ",")

	var count int = 0
	var max int64 = -1 // 最小値を初期値として設定（正の数のみを想定するため）

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
		if num > max {
			max = num
		}
	}

	// 全要素が空だった場合や、数値が存在しなかった場合の処理を考慮（問題の制約上、少なくとも1行出力）
	if count == 0 {
		fmt.Println("count=0 max=0")
	} else {
		fmt.Printf("count=%d max=%d\n", count, max)
	}
}
