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
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		// 入力が空の場合は何も出力しない（あるいは0 0など、仕様に依存するが、ここでは入力がない場合は何もしない）
		return
	}
	line := scanner.Text()

	// カンマで分割し、各要素を処理する
	fields := strings.Split(line, ",")
	uniqueNumbers := make(map[int64]bool)
	var totalSum int64 = 0

	for _, field := range fields {
		trimmedField := strings.TrimSpace(field)
		if trimmedField == "" {
			continue
		}

		num, err := strconv.ParseInt(trimmedField, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複を除外する
		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			totalSum += num
		}
	}

	count := len(uniqueNumbers)

	// 厳密に count=<個数> sum=<合計> の1行を出力する
	fmt.Printf("count=%d sum=%d\n", count, totalSum)
}
