package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var count int
	var maxValue int64 = -1 // 64bit整数を扱うため、初期値を適切に設定する (最小値として-1などを想定)

	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		// カンマ区切りの整数列として処理するため、一行全体を分割するのではなく、
		// 入力ストリーム全体を読み込んでカンマで分割する方が自然。
		// ただし、例題の形式に従い、標準入力全体を一度に読み込むアプローチを採用する。
	}

	// 標準入力全体を読み込む
	data, err := os.ReadFile(0) // 0は標準入力
	if err != nil {
		// エラー処理（ここでは無視して続行）
		return
	}

	inputStr := string(data)
	// カンマで分割
	parts := strings.Split(inputStr, ",")

	count = 0
	var max int64 = -1 // 最小値として非常に小さな値を設定（問題の制約上、負の数も考慮する）

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数として解釈を試みる
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない場合は無視
			continue
		}

		count++
		if n > max {
			max = n
		}
	}

	// 結果を出力
	fmt.Printf("count=%d max=%d\n", count, max)
}
