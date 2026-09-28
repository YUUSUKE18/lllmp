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

	parts := strings.Split(input, ",")
	var totalSum int64 = 0
	var count int64 = 0

	for _, part := range parts {
		if part == "" {
			continue
		}
		kv := strings.Split(part, ":")
		if len(kv) != 2 {
			continue
		}

		var value int64
		var numOccurrences int64
		_, errV := fmt.Sscanf(kv[0], "%d", &value)
		_, errN := fmt.Sscanf(kv[1], "%d", &numOccurrences)

		if errV == nil && errN == nil {
			// 値:回数 の形式で読み込む
			// 課題の例では、7:3,2:2 のように値をカンマで区切っているため、
			// 各要素が「値:回数」のペアとして解釈される。
			// 読み込んだ値は、値が重複して出現することを考慮して加算する。
			// 値:回数 の形式を厳密に解釈し、その「値」を「回数」だけ加算する。
			for i := int64(0); i < numOccurrences; i++ {
				totalSum += value
			}
			count += numOccurrences
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, totalSum)
}
