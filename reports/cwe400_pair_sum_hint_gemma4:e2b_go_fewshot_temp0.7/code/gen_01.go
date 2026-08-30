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

	// 1行目を読み込み、目標値を設定
	if !scanner.Scan() {
		return
	}
	targetStr := strings.TrimSpace(scanner.Text())
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// 目標値のパースに失敗した場合は終了（仕様上、入力は有効と仮定されるが安全のため）
		return
	}

	// 2行目以降を読み込み、整数を格納
	numbers := []int64{}
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err == nil {
			numbers = append(numbers, n)
		}
	}

	// 2個の組の個数を計算
	count := 0
	n := len(numbers)

	// O(N^2)で全てのペアをチェックする（制約が不明だが、実用的な時間とメモリを要求されているため、Nが非常に大きい場合はより効率的な解法が必要だが、ここでは一般的な二重ループで実装する）
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if numbers[i]+numbers[j] == target {
				count++
			}
		}
	}

	// 結果を出力
	fmt.Printf("pairs=%d\n", count)
}
