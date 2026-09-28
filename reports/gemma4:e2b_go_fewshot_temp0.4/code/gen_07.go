package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力全体を読み込む
	input, err := os.ReadFile(0) // os.Stdinのバイト列を読み込む
	if err != nil {
		// 入力エラーは無視するか、適切に処理するが、ここでは単に終了する
		return
	}
	inputStr := string(input)

	// カンマで分割し、各要素を処理する
	parts := strings.Split(strings.TrimSpace(inputStr), ",")

	// 重複を除いた整数を格納するためのマップと合計用の変数
	seen := make(map[int64]bool)
	var count int64 = 0
	var sum int64 = 0

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複チェックと集計
		if !seen[n] {
			seen[n] = true
			count++
			sum += n
		}
	}

	// 結果を要求された形式で出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
