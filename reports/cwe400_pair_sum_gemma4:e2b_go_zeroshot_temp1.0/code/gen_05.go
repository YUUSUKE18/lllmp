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
	targetStr := strings.TrimSpace(scanner.Text())
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// 目標値の読み込みに失敗した場合は終了
		return
	}

	// 2行目以降の数値を読み込む
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
		// 空行や数値として解釈できない行は無視される
	}

	// 2個の組の個数を数える
	count := 0
	n := len(numbers)

	// 2つの異なる要素 a[i] と a[j] について a[i] + a[j] = target となるペアを数える
	// i < j を満たすように走査する
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
