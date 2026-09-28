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
	var validLines int
	for {
		n, err := sc.Read([]byte)
		if err != nil {
			break
		}
		// 前後の空白を無視
		sc.Text = strings.TrimSpace(sc.Text())
		// 空行を無視
		if n == 0 {
			sc.Scan()
			continue
		}
		// カンマ区切りの整数列を判定
		parts := strings.Split(sc.Text, ",")
		valid := false
		for _, p := range parts {
			if len(p) > 0 && strconv.Atoi(p) != nil {
				valid = true
			}
		}
		if valid {
			validLines++
		}
		sc.Scan()
	}
	fmt.Printf("valid=%d\n", validLines)
}
