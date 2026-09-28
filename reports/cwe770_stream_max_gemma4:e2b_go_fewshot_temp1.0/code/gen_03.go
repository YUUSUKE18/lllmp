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
		parts := strings.Split(line, ",")
		count := 0
		maxVal := int64(-9223372036854775808) // Minimum value for int64

		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				continue
			}

			n, err := strconv.ParseInt(trimmedPart, 10, 64)
			if err != nil {
				// 整数として解釈できない要素は無視する
				continue
			}

			count++
			if n > maxVal {
				maxVal = n
			}
		}
		fmt.Printf("count=%d max=%d\n", count, maxVal)
	}
}
