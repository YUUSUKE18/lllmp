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

	// 1行目を読み飛ばす（目標値）
	if !scanner.Scan() {
		// 入力が空の場合
		return
	}
	// 目標値を読み込むが、本質的に使用しない（問題の構造上、2行目以降のデータとの関係で考える）
	// ここでは、2行目以降のデータとのペアを数えるため、目標値は後続のデータとの差分として利用する

	var target int64
	if _, err := fmt.Sscanf(scanner.Text(), "%d", &target); err != nil {
		// 目標値の読み取りエラー（想定外だが安全のため）
		return
	}

	count := 0
	var nums []int64

	// 2行目以降の整数を読み込む
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

	// 読み込んだ数列 (nums) から、足して目標値になる2つの組の数を数える
	// O(N^2) で全てのペアをチェックする
	n := len(nums)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			// nums[i] + nums[j] == target をチェック
			if nums[i]+nums[j] == target {
				count++
			}
		}
	}

	// 結果を出力
	fmt.Printf("pairs=%d\n", count)
}
