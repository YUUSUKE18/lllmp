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
		// 目標値のパースエラー（通常は問題の制約上発生しないが念のため）
		return
	}

	// 2行目以降: 整数を読み込み、位置を記録する
	positions := []int64{}
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if line == "" {
			continue // 空行は無視
		}
		num, err := strconv.ParseInt(line, 10, 64)
		if err == nil {
			positions = append(positions, num)
		}
	}

	// 2個の組の数を求める
	count := 0
	n := len(positions)

	// 2個の組 (i, j) で positions[i] + positions[j] == target となるものを探す
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if positions[i]+positions[j] == target {
				count++
			}
		}
	}

	// 結果の出力
	fmt.Printf("pairs=%d\n", count)
}
