package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	var goalStr string
	var numbers []int

	// 第1行は目標値を入力
	fmt.Scanln(os.Stdin, &goalStr)

	// 前後の空白を削除
	goalStr = strings.TrimSpace(goalStr)

	// ライン入力の処理
	for {
		if !fmt.Scan(os.Stdin, &goalStr) {
			break
		}
		goalStr = strings.TrimSpace(goalStr)
		if goalStr == "" {
			break
		}

		// ラインを分割
		lines := strings.Split(goalStr, "\n")
		if len(lines) < 2 {
			continue
		}

		// 第2行以降の整数を取得
		for i := 2; i < len(lines); i++ {
			line := strings.TrimSpace(lines[i])
			if line == "" {
				continue
			}
			n, err := strconv.Atoi(line)
			if err == nil {
				numbers = append(numbers, n)
			}
		}

		// 最後の行を処理
		if len(lines) > 2 {
			lastLine := strings.TrimSpace(lines[len(lines)-1])
			if lastLine == "" {
				continue
			}
			n, err := strconv.Atoi(lastLine)
			if err == nil {
				numbers = append(numbers, n)
			}
		}

		// 目標値を整数に変換
		g, err := strconv.Atoi(goalStr)
		if err != nil {
			continue
		}

		// 個数を取得
		var countStr string
		if len(lines) > 1 {
			countStr = strings.TrimSpace(lines[1])
		}
		if countStr == "" {
			continue
		}

		count, err := strconv.Atoi(countStr)
		if err != nil {
			continue
		}

		// 2個の組を検索
		pairs := make(map[int]int)
		for i := 0; i < len(numbers); i++ {
			for j := i + 1; j < len(numbers); j++ {
				if pairs[numbers[i]] == 0 {
					pairs[numbers[i]] = 1
				} else {
					pairs[numbers[i]]++
				}
				if pairs[numbers[j]] == 0 {
					pairs[numbers[j]] = 1
				} else {
					pairs[numbers[j]]++
				}
			}
		}

		// 個数に応じて対応
		if count == 0 {
			fmt.Println("pairs=0")
		} else if count == 1 {
			fmt.Println("pairs=" + fmt.Sprintf("%d", len(pairs)))
		} else {
			fmt.Println("pairs=" + fmt.Sprintf("%d", 0))
		}
	}
}
