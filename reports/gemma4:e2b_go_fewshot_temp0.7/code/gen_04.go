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
		
		// 重複を除いた整数を格納するためのマップ
		seen := make(map[int]bool)
		var count int
		var sum int64

		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				continue
			}
			
			n, err := strconv.Atoi(trimmedPart)
			if err != nil {
				// 整数として解釈できない要素は無視
				continue
			}

			if !seen[n] {
				seen[n] = true
				count++
				sum += int64(n)
			}
		}

		fmt.Printf("count=%d sum=%d\n", count, sum)
	}
}
