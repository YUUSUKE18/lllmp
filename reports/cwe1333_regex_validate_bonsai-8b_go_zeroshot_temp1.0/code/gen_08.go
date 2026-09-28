package main

import (
	"fmt"
	"strings"
)

func main() {
	// インプットを読み取る
	var input string
	fmt.Scanner.Scanln(&input)

	// 全体を分割する
	rows := strings.Split(input, "\n")

	// 各行をチェック
	validRows := 0
	for _, row := range rows {
		// 行が空行か、それ以外の空白を無視する
		if strings.TrimSpace(row) == "" {
			continue
		}

		// ラベルは数字とカンマ以外のものを無視
		// カンマ区切りの整数列の検出
		parts := strings.Split(row, ",")
		if len(parts) > 1 {
			validRows++
		}
	}

	// 最終出力
	fmt.Printf("valid=%d\n", validRows)
}
