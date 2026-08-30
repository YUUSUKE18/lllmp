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

	// 1行目を読み込み、目標値を設定
	if !sc.Scan() {
		return
	}
	targetStr := strings.TrimSpace(sc.Text())
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		return
	}

	// 2行目以降を読み込み、整数を格納
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

	// 2個の組の数を計算
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
