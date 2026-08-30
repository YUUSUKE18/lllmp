package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	line, err := r.ReadString('\n')
	if err != nil && len(line) == 0 {
		// 入力が空の場合
		fmt.Println("count=0 max=0")
		return
	}

	fields := strings.Split(strings.TrimSpace(line), ",")

	count := 0
	maxValue := int64(0)
	foundNumber := false

	for _, field := range fields {
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}
		num, err := strconv.ParseInt(trimmedField, 10, 64)
		if err == nil {
			count++
			if num > maxValue {
				maxValue = num
			}
			foundNumber = true
		}
	}

	// 空の要素や数値に変換できない要素を無視した後のカウントと最大値を設定する。
	if count == 0 {
		// 全てが無視された場合、デフォルト値として0を設定する（問題文の制約上、空入力に対する挙動を定義する必要がある）
		fmt.Printf("count=0 max=0\n")
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
