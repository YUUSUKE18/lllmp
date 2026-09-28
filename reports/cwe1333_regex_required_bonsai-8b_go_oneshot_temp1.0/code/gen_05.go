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
	sc.Scan()

	for {
		sc.Scan()
		if err != nil {
			break
		}
		line := strings.Fields(sc.Text())
		if len(line) == 0 {
			continue
		}
		// 空白区切りの数字列のみを検査
		if !regexp.MustCompile(`^\d+,\d+$`).Match(strings.Join(line, "")) {
			continue
		}
		validLines++
	}

	fmt.Printf("valid=%d\n", validLines)
}
