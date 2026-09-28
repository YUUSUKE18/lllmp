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
	var validLines int
	for {
		n, err := sc.Read([]byte)
		if err != nil {
			break
		}
		sc.ShootBuf([]byte{n})
		if n == 0 {
			break
		}
		// 行をtrimmedしてカンマ区切りの整数列に分割
		line := strings.TrimSpace(string(sc.Text()))
		// ベンチマークは空格やタブ、カマ以外の内容を含まない
		if !regexp.MustCompile(`^[0-9,]+$`).Match(line) {
			validLines++
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
