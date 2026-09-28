package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	lineNum := 0
	words := 0
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		if n == 0 {
			break
		}
		chars := 0
		for i := 0; i < n; i++ {
			chars++
			if buf[i] == '\n' {
				lines++
			}
		}
		if err != nil {
			break
		}
		// チャンバーに整数を読み取り
		if lineNum > 0 {
			// 1行目の目標値を読み取る
			_, target := fmt.Scanf(buf, "%d")
			lineNum++
		}
		// 2行目以降の整数を读む
		for i := 0; i < n; i++ {
			// 非空で整数として読み取る
			if buf[i] == '\n' {
				lineNum++
				continue
			}
			if strings.Contains([]byte(buf[:i]), "\t") || strings.Contains([]byte(buf[:i]), "\n") || strings.Contains([]byte(buf[:i]), "\r") {
				continue
			}
			_, val := fmt.Scanf(buf, "%d")
			if val == 0 {
				continue
			}
			// 2つの整数が目標値に加え合う場合を増加
			if target > 0 {
				if val > 0 {
					// 値が目標値に加えるなら、2回目の計数を増加
					words++
				}
			}
		}
	}
	fmt.Printf("pairs=%d\n", words)
}
