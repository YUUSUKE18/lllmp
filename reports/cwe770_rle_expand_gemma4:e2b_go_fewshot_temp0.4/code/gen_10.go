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
			// 値:回数 の形式で読み込むため、値と回数を正しく処理する
			// 仕様では「値:回数」がカンマ区切りで並んでいるため、ここでは値と回数をそれぞれ処理する
			// 7:3,2:2 の場合、7:3 と 2:2 のペアを処理する
			// 実際には、入力の構造から、各要素が「値:回数」のペアであると解釈する
			// 例: "7:3,2:2" -> ["7:3", "2:2"]
			
			// 読み込み方が少し複雑なので、再確認。
			// 入力: 7:3,2:2
			// parts: ["7:3", "2:2"]
			
			// part = "7:3"
			// kv = ["7", "3"]
			
			// 最初の要素が値、2番目の要素が回数
			
			// 最初の要素 (値)
			_, errV = fmt.Sscanf(kv[0], "%d", &value)
			if errV != nil {
				continue
			}
			// 2番目の要素 (回数)
			_, errC = fmt.Sscanf(kv[1], "%d", &count)
			if errC != nil {
				continue
			}

			totalCount += count * value
			totalSum += count * value
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalCount, totalSum)
}
