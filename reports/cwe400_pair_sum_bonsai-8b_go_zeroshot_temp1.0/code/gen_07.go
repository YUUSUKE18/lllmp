package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var targetStr string
	var numbers []int

	// 第1行から目標値を取得
	lines := strings.Split(os.Args, "\n")
	if len(lines) > 1 {
		targetStr = lines[1]
	}

	// 前後の行を無視し、正規な整数を抽出
	for i := 1; i < len(lines); i++ {
		if s, err := strconv.Atoi(lines[i]); err == nil {
			numbers = append(numbers, s)
		}
	}

	// セールフロントのチェック
	if len(numbers) < 2 {
		fmt.Println("pairs=0")
		return
	}

	// パイアスのためのサorted配列
	sorted := make([]int, len(numbers))
	for i, v := range numbers {
		sorted[i] = v
	}

	// 目標値の補正
	target, err := strconv.Atoi(targetStr)
	if err != nil {
		fmt.Println("pairs=0")
		return
	}

	// パイアスの計算
	pairs := 0
	for i := 0; i < len(sorted); i++ {
		for j := i + 1; j < len(sorted); j++ {
			if sorted[i]+sorted[j] == target {
				pairs++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
