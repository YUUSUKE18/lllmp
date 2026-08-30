package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return
	}

	input := scanner.Text()
	
	// カンマで分割して個々のレコードを取得
	records := strings.Split(input, ",")
	
	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, record := range records {
		record = strings.TrimSpace(record)
		if record == "" {
			continue
		}

		// ":" で分割して値と回数を取得
		parts := strings.Split(record, ":")
		if len(parts) != 2 {
			continue // 形式が不正な場合は無視
		}

		valueStr := strings.TrimSpace(parts[0])
		countStr := strings.TrimSpace(parts[1])

		// 値と回数が整数として有効かチェック
		var value int64
		var count int64
		
		_, errV := fmt.Sscan(valueStr, &value)
		_, errC := fmt.Sscan(countStr, &count)

		if errV != nil || errC != nil {
			continue // 変換エラーがあれば無視
		}

		// 回数が 0 以上であることを確認（仕様上、回数は 0 以上）
		if count >= 0 {
			totalCount += count
			totalSum += value * count
		}
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
