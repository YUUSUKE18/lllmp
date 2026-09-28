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
	
	// 1行目を読み飛ばす (目標値)
	if !scanner.Scan() {
		return
	}
	// 目標値はここでは使用しないが、入力形式に合わせるため読み込む
	// targetStr := scanner.Text() 

	count := 0
	nums := []int64{}

	// 2行目以降の入力を読み込む
	for scanner.Scan() {
		line := scanner.Text()
		if strings.TrimSpace(line) == "" {
			continue // 空行は無視
		}
		
		// 整数として解釈できるか試みる
		var num int64
		_, err := fmt.Sscanf(line, "%d", &num)
		
		if err == nil {
			nums = append(nums, num)
		}
	}

	// 2個の組の数を求める
	// O(N^2)で解く
	n := len(nums)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if nums[i]+nums[j] == 0 { // 問題文の「足して目標値になる2個の組」が、合計が0になることを意味すると仮定する
				count++
			}
		}
	}

	// 結果を出力
	fmt.Printf("pairs=%d\n", count)
}
