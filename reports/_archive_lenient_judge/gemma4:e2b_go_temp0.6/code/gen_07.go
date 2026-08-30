package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	// 標準入力から一行を読み込む
	input, err := os.ReadFile(0) // os.ReadFile(0) は標準入力から読み込むための一般的な方法ではないため、bufioを使う
	if err != nil {
		return
	}
	
	reader := bufio.NewReader(os.Stdin)
	// 標準入力全体を読み込む（ここでは一行として処理する）
	line, err := reader.ReadString('\n')
	if err != nil && err.Error() != "EOF" {
		return
	}

	// 入力文字列から空白と改行を取り除く
	inputStr := strings.TrimSpace(string(line))
	if inputStr == "" {
		fmt.Println("count=0 sum=0")
		return
	}

	// カンマで分割し、重複を除いた整数を抽出する
	parts := strings.Split(inputStr, ",")
	
	// 重複を除去するためにマップを使用
	uniqueNumbers := make(map[int]bool)
	var validNumbers []int

	for _, part := range parts {
		trimmedPart := strings.TrimSpace(part)
		if trimmedPart == "" {
			continue
		}
		
		num, err := strconv.Atoi(trimmedPart)
		if err != nil {
			// 整数として解釈できない要素は無視
			continue
		}

		// 重複チェック
		if !uniqueNumbers[num] {
			uniqueNumbers[num] = true
			validNumbers = append(validNumbers, num)
		}
	}

	// 合計を計算する
	var count int64 = int64(len(validNumbers))
	var sum int64 = 0

	for _, num := range validNumbers {
		sum += int64(num)
	}

	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
