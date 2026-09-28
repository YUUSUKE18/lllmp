package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var validLines int
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		if n == 0 {
			continue
		}
		// 1行ずつ処理
		if n == 1 {
			// 空行は無視
			if strings.TrimSpace(buf[0:n]) == "" {
				continue
			}
			// パイプと空格以外の数字列を検索
			re := regexp.MustCompile(`^\s*(\d+(?:,\d+)*\d+)(\s*$|\s*\/\s*$)`)
			if re.MatchString(buf[0:n]) {
				validLines++
			}
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
