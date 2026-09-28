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

	// 1行目: 目標値の読み込み
	if !scanner.Scan() {
		return
	}
	targetStr := scanner.Text()
	target, err := strconv.ParseInt(strings.TrimSpace(targetStr), 10, 64)
	if err != nil {
		// 目標値の解析に失敗した場合は処理を終了
		return
	}

	// 2行目以降: 数値の読み込みと処理
	var numbers []int64
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		num, err := strconv.ParseInt(line, 10, 64)
		if err == nil {
			numbers = append(numbers, num)
		}
	}

	// 足して目標値になる2個の組の数を数える
	pairCount := 0
	n := len(numbers)

	// すべてのペア (i, j) で i != j をチェックする
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if numbers[i]+numbers[j] == target {
				pairCount++
			}
		}
	}

	// 結果の出力
	fmt.Printf("pairs=%d\n", pairCount)
}
