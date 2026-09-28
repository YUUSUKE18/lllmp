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
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		return
	}

	// 2行目以降の整数の読み込み
	numbers := []int64{}
	for scanner.Scan() {
		line := scanner.Text()
		// 空行は無視
		if strings.TrimSpace(line) == "" {
			continue
		}
		
		// 整数として解釈可能かチェックし、読み込む
		if n, err := strconv.ParseInt(line, 10, 64); err == nil {
			numbers = append(numbers, n)
		}
	}

	// 2個の組の数を求める
	count := 0
	n := len(numbers)

	// 2つの異なる位置 (i, j) の組を探す。i != j
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			// numbers[i] と numbers[j] の和が目標値になるかチェック
			if numbers[i]+numbers[j] == target {
				count++
			}
		}
	}

	// 結果の出力
	fmt.Printf("pairs=%d\n", count)
}
