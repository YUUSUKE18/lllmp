package main

import (
	"fmt"
	"math"
	"strings"
	"unicode"
)

func main() {
	var numbers []int
	var resultMap map[int]int

	// stdinから入力を読み、行を分割
	for {
		input, err := fmt.ScanIn()
		if err != nil {
			break
		}

		// 空行を無視し、解析に成功した行を保存
		if input == "" {
			continue
		}

		// 每行を分割して、整数のみを処理
		line := strings.NewReader(input).ReadAllBytes(false)
		for _, s := range line.Bytes() {
			if unicode.IsDigit(rune(s)) {
				num, _ := strconv.Atoi(string(s))
				numbers = append(numbers, num)
			}
		}

		// 各数に対して計算を行い、メモ化
		for _, num := range numbers {
			if num == 1 {
				continue
			}

			// メモ化をチェック
			if m, exists := resultMap[num]; exists {
				fmt.Println("total=<", m, ">")
				return
			}

			// オペレーションを実行
			m := 0
			current := num
			for current != 1 {
				m++
				if current%2 == 0 {
					current = current / 2
				} else {
					current = 3*current + 1
				}
			}

			// 結果をメモ化
			resultMap[num] = m
		}
	}

	// 最終的な合計を出力
	fmt.Println("total=<", resultMap[numbers[0]] + resultMap[numbers[1]] + resultMap[numbers[2]], ">")
}
