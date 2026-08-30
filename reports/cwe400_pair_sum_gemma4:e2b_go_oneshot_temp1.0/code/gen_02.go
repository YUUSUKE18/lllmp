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
		// 目標値が不正な場合は処理を終了
		return
	}

	// 2行目以降: 整数列の読み込み
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

	// 2個の組の数を計算
	count := int64(0)
	n := len(numbers)

	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			// 足して目標値になる2個の組（位置が異なる2個）の個数を求める
			if numbers[i]+numbers[j] == int64(target) {
				count++
			}
		}
	}

	// 結果の出力
	fmt.Printf("pairs=%d\n", count)
}
