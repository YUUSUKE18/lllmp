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
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		// 入力が空の場合は終了
		return
	}
	line := scanner.Text()

	// カンマで分割し、文字列のスライスを得る
	parts := strings.Split(line, ",")

	// 重複を除いた整数を格納するためのマップ
	uniqueNumbers := make(map[int]bool)

	// 整数を処理する
	for _, part := range parts {
		// 前後の空白をトリム
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}

		// 整数に変換を試みる
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視する
			continue
		}

		// 重複を除いた集合に追加
		uniqueNumbers[num] = true
	}

	// ユニークな整数をスライスに変換
	var uniqueInts []int
	for num := range uniqueNumbers {
		uniqueInts = append(uniqueInts, num)
	}

	// 個数と合計を計算するためにソートする（必須ではないが、後の処理の整合性を保つ）
	sort.Ints(uniqueInts)

	count := len(uniqueInts)
	var sum int64 = 0

	// 合計を計算 (合計は64bitに収まることが保証されているため int64 を使用)
	for _, num := range uniqueInts {
		sum += int64(num)
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
