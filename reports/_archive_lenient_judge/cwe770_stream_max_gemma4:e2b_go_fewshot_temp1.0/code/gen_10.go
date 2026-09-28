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
	if sc.Scan() {
		line := sc.Text()
		if line == "" {
			fmt.Println("count=0 max=0")
			return
		}

		fields := strings.Split(line, ",")
		count := 0
		maxVal := int64(-2147483648) // Minimum value for int64 to be safe (or use a flag)
		initialized := false

		for _, field := range fields {
			trimmedField := strings.TrimSpace(field)
			if trimmedField == "" {
				continue
			}

			n, err := strconv.ParseInt(trimmedField, 10, 64)
			if err != nil {
				// Integerとして解釈できない要素は無視する
				continue
			}

			count++

			if !initialized || n > maxVal {
				maxVal = n
				initialized = true
			}
		}

		if count == 0 {
			// カンマ区切りの要素がすべて空だった、または数値がなかった場合
			fmt.Println("count=0 max=0")
		} else {
			fmt.Printf("count=%d max=%d\n", count, maxVal)
		}
	}
}
