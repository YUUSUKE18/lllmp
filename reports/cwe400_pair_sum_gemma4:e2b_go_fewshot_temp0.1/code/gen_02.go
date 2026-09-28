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
		return
	}
	targetStr := strings.TrimSpace(sc.Text())
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		return
	}

	// 2行目以降: 整数を読み込み、ペアを探索
	nums := []int64{}
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err == nil {
			nums = append(nums, n)
		}
	}

	// 2個の組の数を求める
	count := 0
	n := len(nums)

	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if nums[i]+nums[j] == target {
				count++
			}
		}
	}

	// 結果の出力
	fmt.Printf("pairs=%d\n", count)
}
