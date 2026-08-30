package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	
	// 1行目を目標値として読み込む
	if !scanner.Scan() {
		return
	}
	targetStr := scanner.Text()
	target, err := strconv.ParseInt(strings.TrimSpace(targetStr), 10, 64)
	if err != nil {
		// 目標値の読み取りに失敗した場合は終了
		return
	}

	count := 0
	seen := make(map[int64]int) // 値とその出現回数を記録するマップ

	// 2行目以降を読み込む
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}

		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			// 整数として解釈できない行は無視
			continue
		}

		// 2個の組を数えるために、各値の出現回数を記録する
		seen[num]++
	}

	// 2個の組の数を計算する
	// 各値 x が n 回出現する場合、その値からペアを組むことができるのは n * (n - 1) / 2 通り
	totalPairs := int64(0)
	for _, freq := range seen {
		if freq >= 2 {
			// nC2 = n * (n - 1) / 2
			pairs := freq * (freq - 1) / 2
			totalPairs += pairs
		}
	}

	// 結果を出力
	fmt.Printf("pairs=%d\n", totalPairs)
}
