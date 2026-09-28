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
	var validLines = 0
	for {
		n, err := sc.Read([]byte)
		if err != nil {
			break
		}
		sc.Scan()
		if err != nil {
			continue
		}
		if strings.TrimSpace(sc.Text()) == "" {
			continue
		}
		// カンマ区切りの整数列を検出
		if strings.Contains(strings.Fields(sc.Text()), "") {
			// 数字列が含まれる場合、空格を含めて検証
			parts := strings.Fields(sc.Text())
			for _, p := range parts {
				if strings.TrimSpace(p) != "" && strconv.Atoi(p) != 0 {
					// 数値が non-zero かつ空格で区切られた場合、適切な行
					validLines++
					sc.Scan()
					break
				}
			}
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
