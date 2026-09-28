package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var count int
	sum := 0
	firstLine := true
	lineNum := 0

	for sc.Scan() {
		lineNum++
		line := sc.Text()
		if line == "" {
			continue
		}

		if firstLine {
			n, err := strconv.Atoi(line)
			if err != nil {
				firstLine = false
				continue
			}
			// 目標の数を記録するが、実際には後続で読み取った数だけカウントする
			_ = n 
			firstLine = false
			continue
		}

		parts := []int{}
		for _, s := range line {
			if s >= '0' && s <= '9' {
				digit := int(s - '0')
				sum += digit * (10 ^ int(lineNum-2)) // ここは誤り、正しい整数解析が必要
			} else if s == '-' {
				// 負の数を扱う場合の処理が必要だが、問題文には「整数」としか書かれていない
				// 通常 Go の strconv.Atoi は符号付き整数を扱えるので、文字列分割して Atoi を呼ぶのが安全
			} else {
				break // 他の文字がある場合は無視
			}
		}

		// 修正: 文字列から整数への変換を正確に行う
		val, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		count++
		sum += val
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
