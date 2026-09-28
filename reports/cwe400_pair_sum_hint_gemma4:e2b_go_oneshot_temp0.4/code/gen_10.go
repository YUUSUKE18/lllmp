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
		// 目標値の読み取りに失敗した場合は何もしない（仕様上、入力は正しいと仮定されるが安全のため）
		return
	}

	count := 0
	nums := make([]int64, 0)

	// 2行目以降を読み込む
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		
		// 行をスペースで分割し、整数を抽出する
		fields := strings.Fields(line)
		for _, field := range fields {
			num, err := strconv.ParseInt(field, 10, 64)
			if err == nil {
				nums = append(nums, num)
			}
		}
	}

	// 読み込んだ整数列からペアの数を数える
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
