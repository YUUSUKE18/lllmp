package main

import (
	"bufio"
	"fmt"
	"io"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(io.Discard) // 標準入力を読み込むための設定
	scanner := bufio.NewScanner(reader)
	
	// 標準入力をスキャンする
	if err := scanner.Scan(); err != nil {
		return
	}
	
	input := scanner.Text()
	parts := strings.Split(input, ",")
	
	count := int64(0)
	sum := int64(0)
	
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		
		// 値:回数の形式を検証
		parts2 := strings.SplitN(part, ":", 2)
		if len(parts2) != 2 {
			continue
		}
		
		valueStr := strings.TrimSpace(parts2[0])
		countStr := strings.TrimSpace(parts2[1])
		
		if valueStr == "" || countStr == "" {
			continue
		}
		
		value, errVal := strconv.ParseInt(valueStr, 10, 64)
		if errVal != nil {
			continue
		}
		
		counts, errCount := strconv.ParseInt(countStr, 10, 64)
		if errCount != nil {
			continue
		}
		
		if counts < 0 {
			continue
		}
		
		count += int64(counts)
		sum += value * counts
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
