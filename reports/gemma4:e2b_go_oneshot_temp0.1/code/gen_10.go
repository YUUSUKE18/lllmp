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
	// 標準入力から一行を読み込む
	input, err := os.ReadFile(0) // os.Stdinのバイト列を読み込む（ここではシンプルにstdin全体を想定）
	if err != nil {
		// 実際にはbufio.Scannerを使う方がより堅牢だが、今回は1行読み込みを想定して処理する
		return
	}
	inputStr := strings.TrimSpace(string(input))

	if inputStr == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	// カンマで分割し、各要素を整数に変換する
	parts := strings.Split(inputStr, ",")
	uniqueNumbers := make(map[int64]bool)
	var sum int64 = 0

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複を除外する
		if !uniqueNumbers[n] {
			uniqueNumbers[n] = true
			sum += n
		}
	}

	count := int64(len(uniqueNumbers))

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
