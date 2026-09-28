package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	input, err := os.ReadFile(0)
	if err != nil {
		return
	}
	data := strings.TrimSpace(string(input))

	if data == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	// カンマで分割して整数列を取得
	parts := strings.Split(data, ",")
	
	uniqueNumbers := make(map[int64]bool)
	var sum int64 = 0
	
	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}
		
		// 重複を除いた整数を扱うため、マップに登録する
		if !uniqueNumbers[n] {
			uniqueNumbers[n] = true
			sum += n
		}
	}

	count := int64(len(uniqueNumbers))
	
	// 合計を計算し直す（上記ループで sum を計算済みだが、念のため）
	// uniqueNumbers の値から合計を再計算する方がより明確かもしれないが、ここではループ内で集計したものを採用する。
	// ループ内での集計が最適化されているため、countとsumを使用する。

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
