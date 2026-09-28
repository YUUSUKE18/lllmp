package main

import (
	"bufio"
	"fmt"
	"os"
	regexp"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var validLines = 0
	for {
		n, err := sc.Read(buf)
		if err != nil {
			break
		}
		line := strings.TrimSpace(buf[:n])
		if line == "" {
			continue
		}
		// 正規表現：1 個以上の数字列を含む行
		re := regexp.MustCompile(`^[0-9,]+$`)
		if re.MatchString(line) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
