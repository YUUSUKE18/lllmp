package main

import (
	"fmt"
	"strconv"
	"strings"
	"unicode"
)

func main() {
	var goal string
	var numbers []int

	// 第1行から目標値を取得
	line := strings.NewReader("").ReadAllLines()
	for _, s := range line {
		if s == "" {
			continue
		}
		if unicode.IsDigit(s) {
			// 1行目が目標値の行
			// 全体の行数を数える
			// 2行目以降は数字を検出
			// もし1行目が非数字の場合は、次の行から数字を取得
			if len(s) == 0 {
				// 空行または非数字
				continue
			}
			// 値と個数を検索
			if len(s) >= 1 && unicode.IsDigit(s[0]) {
				parts := strings.FieldsN(s, " ")
				if len(parts) >= 2 {
					if _, err := strconv.Atoi(parts[0]); err != nil {
						continue
					}
					num, err := strconv.Atoi(parts[1])
					if err != nil {
						continue
					}
					if num == 0 {
						continue
					}
					// もし1行目が非数字の場合は、次の行から数字を取得
					if !unicode.IsDigit(s[0]) {
						nextLine := strings.NewReader("").ReadAllLines()
						for _, nStr := range nextLine {
							if nStr == "" {
								continue
							}
							parts := strings.FieldsN(nStr, " ")
							if len(parts) >= 2 {
								if _, err := strconv.Atoi(parts[0]); err != nil {
									continue
								}
								num, err := strconv.Atoi(parts[1])
								if err != nil {
									continue
								}
								if num == 0 {
									continue
								}
						}
					}
					numbers = append(numbers, num)
				}
			}
		}

	// パイアズを検索
	var pairs int
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == goal {
				pairs++
			}
		}
	}

	// 結果を出力
	fmt.Printf("pairs=%d\n", pairs)
}
