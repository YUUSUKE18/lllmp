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

	parts := strings.Split(strings.TrimSpace(data), ",")

	var totalCount int64 = 0
	var totalSum int64 = 0

	for _, part := range parts {
		if part == "" {
			continue
		}
		kv := strings.Split(part, ":")
		if len(kv) != 2 {
			continue
		}

		var value int64
		var count int64
		_, errV := fmt.Sscanf(kv[0], "%d", &value)
		_, errC := fmt.Sscanf(kv[1], "%d", &count)

		if errV == nil && errC == nil {
			// 値:回数 の形式で、値がキーとして機能すると解釈する（例: 7:3 -> 値=7, 回数=3）
			// 仕様の例「7:3,2:2 は 7,7,7,2,2 という整数列を表します」に基づき、
			// 「値:回数」を「値」を「回数」だけ繰り返すものと解釈し、
			// 実際には「値」が要素であり、「回数」がその要素の出現回数と解釈する。
			// 例：7:3 は 7 が 3 回出現する (7, 7, 7)
			for i := int64(0); i < count; i++ {
				totalCount++
				totalSum += value
			}
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
