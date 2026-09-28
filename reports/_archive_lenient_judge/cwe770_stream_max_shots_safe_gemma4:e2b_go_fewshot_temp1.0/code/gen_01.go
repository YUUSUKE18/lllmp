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

	// カンマで分割
	parts := strings.Split(strings.TrimSpace(line), ",")

	count := 0
	maxValue := int64(0)
	foundValidNumber := false

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}

		num, err := strconv.ParseInt(part, 10, 64)
		if err == nil {
			count++
			if num > maxValue {
				maxValue = num
			}
			foundValidNumber = true
		}
	}

	// 空の要素がすべて無視された場合や、数値が存在しなかった場合の処理を考慮する
	if count == 0 {
		// 全く有効な整数が見つからなかった場合。この場合はcount=0, max=0としたい。
		fmt.Printf("count=0 max=0\n")
	} else {
		fmt.Printf("count=%d max=%d\n", count, maxValue)
	}
}
