package main

import (
	"fmt"
	"strconv"
	"strings"
	"unicode"
)

func main() {
	input := strings.NewReader("1,2,3,4,5,5,6,7,8,8,9,10,11,11,12,13,14,15,15,16")
	// オリジナルの整数のリストを作成
	numbers := []int{}
	for _, s := range input.Text() {
		// 数字の部分を抽出
		var sNum string
		for _, c := range s {
			if unicode.IsDigit(c) {
				sNum += string(c)
			}
		}
		// 空格や符号を除き、整数に変換
		if len(sNum) > 0 {
			n, err := strconv.Atoi(sNum)
			if err == nil {
				numbers = append(numbers, n)
			}
		}
	}
	// 個数と合計を計算
	count := 0
	sum := 0
	seen := make(map[int]bool)
	for _, num := range numbers {
		if !seen[num] {
			seen[num] = true
			count++
			sum += num
		}
	}
	// 結果を出力
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
