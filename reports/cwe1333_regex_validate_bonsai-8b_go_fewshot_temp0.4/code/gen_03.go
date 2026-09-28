package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	valid := 0
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		// 行の前後の空白を無視
		sc.Text = strings.TrimSpace(sc.Text())
		// 行が空かかをチェック
		if n == 0 {
			sc.Scan()
			continue
		}
		// カンマ区切りの整数列を判定
		parts := strings.Fields(sc.Text)
		if len(parts) < 1 {
			sc.Scan()
			continue
		}
		// パーツの中には数字とカンマ以外のものを含めない
		validCount := 0
		for _, p := range parts {
			n, err := strconv.Atoi(p)
			if err != nil {
				// パーツ内で数字以外のものを含んでいる
				validCount++
				break
			}
			validCount++
		}
		if validCount >= 1 {
			valid++
		}
		sc.Scan()
	}
	fmt.Printf("valid=%d\n", valid)
}
