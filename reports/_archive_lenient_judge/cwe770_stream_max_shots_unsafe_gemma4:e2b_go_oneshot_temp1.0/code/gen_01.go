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
	
	// カンマで分割して整数列を取得
	fields := strings.Split(line, ",")
	
	count := 0
	maxValue := int64(0)
	found := false

	for _, field := range fields {
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}
		
		n, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}
		
		count++
		if !found || n > maxValue {
			maxValue = n
			found = true
		}
	}

	// 要求された形式で出力
	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
