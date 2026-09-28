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
	var validLines int
	for {
		sc.Scan()
		if !sc.Done() {
			break
		}
		line := strings.TrimSpace(sc.Text())
		if strings.Contains(line, ",") {
			// カンマが含まれる線が妥当 iff 数値列が1〜N個
			// 空行や空格含む行は無視
			if len(strings.Fields(line)) > 0 {
				validLines++
			}
		}
	}
	fmt.Printf("valid=%d\n", validLines)
}
