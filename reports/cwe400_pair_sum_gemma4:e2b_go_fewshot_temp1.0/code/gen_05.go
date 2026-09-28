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
		// 入力が空の場合は終了
		return
	}
	targetStr := strings.TrimSpace(sc.Text())
	target, err := strconv.ParseInt(targetStr, 10, 64)
	if err != nil {
		// 目標値の解析に失敗した場合は処理を終了（問題の制約上、通常は発生しない想定）
		return
	}

	// 2行目以降の入力を読み込む
	var numbers []int64
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue // 空行は無視
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err == nil {
			numbers = append(numbers, n)
		}
	}

	// 2個の組の数を求める
	pairCount := 0
	n := len(numbers)

	// 2つの異なる位置 (i, j) について、numbers[i] + numbers[j] == target となるペアを数える
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			if numbers[i]+numbers[j] == target {
				pairCount++
			}
		}
	}

	// 結果を出力
	fmt.Printf("pairs=%d\n", pairCount)
}
