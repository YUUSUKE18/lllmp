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

	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// 目標値が不正な場合は処理を終了（問題の制約からここでは想定しないが安全策）
		return
	}

	count := 0
	nums := []int64{}

	// 2行目以降を読み込む
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err == nil {
			nums = append(nums, n)
		}
	}

	// 2個の組の個数を求める
	// i != j かつ nums[i] + nums[j] = target となる組の数を数える
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
