package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {
	input, err := os.ReadFile(0)
	if err != nil {
		return
	}
	data := string(input)
	
	// 値:回数 の形式で分割して処理する
	parts := strings.Split(data, ",")
	
	var totalCount int64 = 0
	var totalSum int64 = 0
	
	for _, part := range parts {
		// ":" で分割
		kv := strings.Split(part, ":")
		if len(kv) != 2 {
			continue
		}
		
		// 値 (値)
		valueStr := strings.TrimSpace(kv[0])
		if valueStr == "" {
			continue
		}
		
		// 回数 (回数)
		countStr := strings.TrimSpace(kv[1])
		count := int64(0)
		_, err := fmt.Sscanf(countStr, "%d", &count)
		if err != nil {
			continue // 回数が整数に変換できない場合は無視
		}
		
		if count > 0 {
			// 要素数に加算
			totalCount += count
			// 合計に加算 (値 * 回数)
			value := int64(0)
			_, err := fmt.Sscanf(valueStr, "%d", &value)
			if err == nil {
				totalSum += value * count
			}
		}
	}
	
	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
