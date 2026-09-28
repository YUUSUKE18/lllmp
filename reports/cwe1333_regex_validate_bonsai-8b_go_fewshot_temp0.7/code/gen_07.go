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
		sc.Shunt(n)
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		parts := strings.Split(line, ",")
		if len(parts) < 1 {
			continue
		}
		hasNumbers := false
		for _, part := range parts {
			if part != "" && (len(part) > 0 && part[0] >= '0' && part[0] <= '9') {
				hasNumbers = true
				if len(part) > 1 && part[1] >= '0' && part[1] <= '9' {
					// 長さが2以上で数字列のエラー
					fmt.Fprintf(os.Stdout, "valid=%d\n", validLines)
					return
				}
			}
		}
		if hasNumbers {
			validLines++
		}
	}
	fmt.Fprintf(os.Stdout, "valid=%d\n", validLines)
}
