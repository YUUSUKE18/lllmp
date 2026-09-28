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

	// 1行目から目標値を読み込む（ここではターゲット値として扱う）
	target, err := strconv.ParseInt(strings.TrimSpace(targetStr), 10, 64)
	if err != nil {
		// 目標値の読み取りに失敗した場合は終了
		return
	}

	count := 0
	nums := make([]int64, 0)

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
		nums = append(nums, num)
	}

	// 2個の組の数を数える
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
