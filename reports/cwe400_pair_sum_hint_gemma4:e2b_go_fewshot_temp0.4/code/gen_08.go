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
	if !scanner.Scan() {
		return
	}
	targetStr := scanner.Text()

	// 目標値を64ビット整数としてパース
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// 目標値のパースに失敗した場合は何もしない（仕様上、入力は正しいと仮定）
		return
	}

	var numbers []int64
	// 2行目以降を読み込む
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		// 空白区切りで整数を読み込む
		fields := strings.Fields(line)
		for _, field := range fields {
			num, err := strconv.ParseInt(field, 10, 64)
			if err == nil {
				numbers = append(numbers, num)
			}
		}
	}

	// 2個の組の数を数える
	count := 0
	n := len(numbers)

	// 2つの要素 a[i] と a[j] が a[i] + a[j] = target となるペアを数える
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
