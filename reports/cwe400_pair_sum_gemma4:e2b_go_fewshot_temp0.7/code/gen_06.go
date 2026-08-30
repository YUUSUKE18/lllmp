package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	// 1行目を読み込み、目標値を設定する
	line, err := reader.ReadString('\n')
	if err != nil {
		// 入力が空の場合など
		return
	}
	targetStr := strings.TrimSpace(line)
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// 目標値が不正な場合
		return
	}

	// 2行目以降を読み込み、整数を格納する
	nums := []int64{}
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		line = strings.TrimSpace(line)
		if line == "" {
			continue // 空行は無視
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}
		nums = append(nums, n)
	}

	// 2個の組の数を数える
	count := 0
	n := len(nums)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if nums[i]+nums[j] == target {
				count++
			}
		}
	}

	// 結果を出力
	fmt.Printf("pairs=%d\n", count)
}
