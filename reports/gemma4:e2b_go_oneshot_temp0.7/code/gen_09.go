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
	input, err := os.ReadFile(0) // os.Stdinを直接読み込むより、ここではリダイレクトされた入力を想定してファイルとして扱うか、bufioを使う方が一般的だが、例に倣い標準入力の処理を行う。
	if err != nil {
		// エラー処理（通常は無視するか、適切にエラーを報告するが、競技プログラミングの文脈では入力がある前提）
		return
	}
	inputStr := string(input)

	// カンマ区切りの文字列を分割し、重複を除いた整数リストを得る
	parts := strings.Split(strings.TrimSpace(inputStr), ",")
	uniqueNumbers := make([]int64, 0)
	seen := make(map[int64]bool)

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

		// 重複を除外
		if !seen[n] {
			seen[n] = true
			uniqueNumbers = append(uniqueNumbers, n)
		}
	}

	// 個数と合計を計算する
	count := int64(len(uniqueNumbers))
	var sum int64
	for _, n := range uniqueNumbers {
		sum += n
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
