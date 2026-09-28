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
		s := strings.TrimSpace(buf[:n])
		// ラベルと正規表現を用いる
		re := regexp.MustCompile(`^\s*(\d+)(?:,\s*\d+)*\s*$`)
		if re.MatchString(s) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
