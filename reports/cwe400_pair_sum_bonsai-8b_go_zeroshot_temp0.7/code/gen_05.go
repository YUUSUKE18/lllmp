package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var target string
	var numbers []int

	// 第1行から目標値を取得
	line1 := strings.NewReader(os.Args[1]).Read()
	if err := strconv.Atoi(line1); err == nil {
		target = line1
		target = strconv.Itoa(int64(target)) // インターアルゴリズムで64bitに制限
	}

	// ポストの行を処理
	for i := 2; i < len(os.Args); i++ {
		line := strings.NewReader(os.Args[i]).Read()
		if val, err := strconv.Atoi(line); err == nil {
			numbers = append(numbers, val)
		}
	}

	// 目標値を64bit整数に変換
	targetVal := strconv.Itoa(int64(target))

	// 合計として、2つの数のペアを検索
	pairs := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == int64(targetVal) {
				pairs++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
