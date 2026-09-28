package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	r := bufio.NewReaderSize(os.Stdin, 64*1024)
	line, err := r.ReadString('\n')
	if err != nil && len(line) == 0 {
		// 入力が空の場合
		fmt.Println("count=0 max=0")
		return
	}

	// カンマで分割して整数を処理
	fields := strings.Split(strings.TrimSpace(line), ",")
	
	count := 0
	maxValue := int64(0)

	for _, field := range fields {
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		val, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する (仕様通り)
			continue
		}

		count++
		if val > maxValue {
			maxValue = val
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxValue)
}
