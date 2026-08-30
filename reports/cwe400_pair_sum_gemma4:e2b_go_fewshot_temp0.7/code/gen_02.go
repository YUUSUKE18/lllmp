package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)

	// 1行目: 目標値の読み込み
	if !sc.Scan() {
		return // 入力が空の場合
	}
	targetStr := strings.TrimSpace(sc.Text())
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		return // 目標値の解析に失敗した場合は終了
	}

	// 2行目以降: 整数を読み込み、ペアを見つける
	var numbers []int64
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue // 空行は無視
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err == nil {
			numbers = append(numbers, n)
		}
	}

	// 2個の組の個数を数える
	count := 0
	n := len(numbers)

	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if numbers[i]+numbers[j] == target {
				count++
			}
		}
	}

	// 結果の出力
	fmt.Printf("pairs=%d\n", count)
}
