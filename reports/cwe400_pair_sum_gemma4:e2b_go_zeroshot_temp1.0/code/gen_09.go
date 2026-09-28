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
	targetStr := strings.TrimSpace(scanner.Text())
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// 目標値のパースに失敗した場合は終了
		return
	}

	// 2行目以降: 数値の読み込み
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
		// 整数として解釈できない行は無視される
	}

	// 2個の組の数を計算
	pairCount := int64(0)
	n := len(numbers)

	// 2つの要素 a[i] と a[j] が target になる条件は a[i] + a[j] = target である。
	// i != j の組を探す。

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
