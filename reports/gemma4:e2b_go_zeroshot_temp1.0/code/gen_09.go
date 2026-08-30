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
	if !scanner.Scan() {
		return
	}
	line := scanner.Text()

	// カンマで分割
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップとセット
	seen := make(map[int]bool)
	var sum int64 = 0
	count := 0

	for _, part := range parts {
		// 前後の空白を削除
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数として解釈可能かチェックし、変換
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複チェックと合計の計算
		if !seen[num] {
			seen[num] = true
			sum += int64(num)
			count++
		}
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
