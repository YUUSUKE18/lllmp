package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var validLines int
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		// 行の前後の空白を無視
		sc.Text = strings.TrimSpace(sc.Text())
		// カンマ区切りの整数列を正規表現で検出
		re := regexp.MustCompile(`^(\d+)(?:,\d+)*$`)
		matches := re.FindAllString(sc.Text, -1)
		if len(matches) >= 1 {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
