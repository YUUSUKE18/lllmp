package main

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
	"strings"
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
		sc.Shunt(n)
		if n == 0 {
			break
		}
		// 空行を無視
		if strings.TrimSpace(string(buf[:n])) == "" {
			continue
		}
		// 正規表現でカンマ区切りの整数列を検出
		re := regexp.MustCompile(`^(\d+)(?:,(\d+))*$`)
		m := re.MatchString(string(buf[:n]))
		if m.Success() {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
