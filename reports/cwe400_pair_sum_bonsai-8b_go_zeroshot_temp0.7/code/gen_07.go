package main

import (
	"fmt"
	"os"
	"strconv"
	"unicode"
)

func main() {
	var goalStr string
	var numbers []int

	// 第1行から目標値を取得
	for _, line := range os.Lines(os.Stdin) {
		if unicode.IsWhitespace(line) {
			continue
		}
		if goalStr == "" {
			// シングルラインの場合、2行目以降の整数を取得
			if len(os.Lines(os.Stdin)) > 2 {
				// 第2行から第N行（N>=2）までを取得
				for _, line := range os.Lines(os.Stdin) {
					if len(line) == 0 {
						continue
					}
					if !unicode.IsDigit(line) {
						continue
					}
					n, err := strconv.Atoi(line)
					if err == nil && n != 0 {
						numbers = append(numbers, n)
					}
				}
			} else {
				// 多行の場合、第1行から第N行（N>=1）までを取得
				for _, line := range os.Lines(os.Stdin) {
					if len(line) == 0 {
						continue
					}
					if !unicode.IsDigit(line) {
						continue
					}
					n, err := strconv.Atoi(line)
					if err == nil && n != 0 {
						numbers = append(numbers, n)
					}
				}
			}
		}

	// 空行が入力されている場合、第1行が空行
	// 遅く入力された行は無視
	// 最終的に、2行目以降の整数を取得する
	// 個数は0か1か2か...なので、0は出力しない
	if len(numbers) < 2 {
		fmt.Println("0")
		return
	}

	pairs := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == goalStr {
				pairs++
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
