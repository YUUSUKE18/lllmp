package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から1行を読み込む
	input, err := os.ReadFile(0) // 0は標準入力
	if err != nil {
		// 入力エラーが発生した場合（通常、競技プログラミング環境では想定されないが念のため）
		return
	}

	data := strings.TrimSpace(string(input))
	if data == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	// カンマで分割
	parts := strings.Split(data, ",")

	// 重複を除いた整数を格納するためのマップと合計用の変数
	seen := make(map[int]bool)
	var count int
	var sum int64

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複チェックと合計の計算
		if !seen[num] {
			seen[num] = true
			count++
			sum += int64(num)
		}
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
