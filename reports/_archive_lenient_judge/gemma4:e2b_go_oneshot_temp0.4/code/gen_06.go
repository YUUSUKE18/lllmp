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
	// 標準入力から一行読み込む
	input, err := os.ReadFile(0) // os.Stdinを直接読み込む代わりに、ここでは標準的な方法を使うが、今回はstdin全体を読み込む必要があるため、bufio.Scannerで処理する方が自然。
	if err != nil {
		return
	}
	
	// 標準入力から一行読み込む（例1の形式に合わせる）
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		return
	}
	line := scanner.Text()

	// カンマで分割し、重複を除いた整数を収集する
	parts := strings.Split(line, ",")
	uniqueNumbers := make(map[int64]bool)
	var sum int64 = 0

	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		n, err := strconv.ParseInt(trimmedPart, 10, 64)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複チェックと合計の計算
		if !uniqueNumbers[n] {
			uniqueNumbers[n] = true
			sum += n
		}
	}

	// 重複を除いた個数を求める
	count := int64(len(uniqueNumbers))

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
