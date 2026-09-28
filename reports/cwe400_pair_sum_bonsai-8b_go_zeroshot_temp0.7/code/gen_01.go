package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var targetStr string
	var numbers []int

	// 第1行から目標値を読み込みます
	_, err := fmt.Scan(os.Stdin, &targetStr)
	if err != nil {
		fmt.Println("Invalid input")
		return
	}

	// ターゲット値を整数に変換
	var target int
	if err := strconv.Atoi(targetStr); err != nil {
		fmt.Println("Invalid target value")
		return
	}

	// 2行以降の整数を読み込みます
	for {
		var line string
		_, err := fmt.Scan(os.Stdin, &line)
		if err != nil {
			if err == io.EOF {
				break
			}
			fmt.Println("Invalid input")
			return
		}

		// 空行を無視
		if line == "" {
			continue
		}

		// 入力が整数であるかをチェック
		num, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		// 数値が64bit整数範囲に収まるかをチェック
		if num < int64(-1) || num > int64(1000000000000) {
			continue
		}

		// 数値が正しく入力された場合に追加
		numbers = append(numbers, num)
	}

	// パイアスと対象値の合計を計算
	pairs := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == target {
				pairs++
			}
		}
	}

	// 結果を出力
	fmt.Printf("pairs=%d\n", pairs)
}
