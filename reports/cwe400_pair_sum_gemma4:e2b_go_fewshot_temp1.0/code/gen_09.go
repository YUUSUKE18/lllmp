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
		// 入力が空の場合は終了
		return
	}
	targetStr := strings.TrimSpace(scanner.Text())
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// 目標値の解析に失敗した場合は処理を終了（厳密な仕様に基づき、入力形式が保証されると仮定）
		return
	}

	// 2行目以降の整数を読み込み、目標値の2つの組を見つける
	
	// 最初の値と、それ以降の値のリストを保持する
	nums := make([]int64, 0)
	
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}
		
		num, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // 整数として解釈できない行は無視
		}
		nums = append(nums, num)
	}

	// 2個の組を見つける (i != j かつ nums[i] + nums[j] == target)
	count := 0
	n := len(nums)
	
	// O(N^2) で全てのペアをチェック
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if nums[i] + nums[j] == target {
				count++
			}
		}
	}

	// 結果の出力
	fmt.Printf("pairs=%d\n", count)
}
