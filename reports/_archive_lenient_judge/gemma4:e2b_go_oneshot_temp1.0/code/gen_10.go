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
	var input string
	// 標準入力から1行を読み込む
	if _, err := fmt.Scanln(&input); err != nil && err.Error() != "unexpected newline" {
		// エラーが発生した場合は終了（空入力の場合など）
		return
	}

	// カンマで分割して、重複を除いた整数を抽出する
	parts := strings.Split(strings.TrimSpace(input), ",")
	uniqueNumbers := make(map[int64]bool)
	var uniqueList []int64

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

		// 重複をチェック
		if !uniqueNumbers[n] {
			uniqueNumbers[n] = true
			uniqueList = append(uniqueList, n)
		}
	}

	// 個数と合計を計算する
	count := len(uniqueList)
	var sum int64 = 0
	for _, n := range uniqueList {
		sum += n
	}

	// 結果を厳密に指定された形式で出力する
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
