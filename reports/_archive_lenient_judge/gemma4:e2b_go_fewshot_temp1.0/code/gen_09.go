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
			fmt.Println("count=0 sum=0")
			return
		}

		parts := strings.Split(line, ",")
		seen := make(map[int]bool)
		count := 0
		sum := int64(0)

		for _, part := range parts {
			trimmedPart := strings.TrimSpace(part)
			if trimmedPart == "" {
				continue
			}

			n, err := strconv.Atoi(trimmedPart)
			if err != nil {
				continue // 整数として解釈できない要素は無視
			}

			if !seen[n] {
				seen[n] = true
				count++
				sum += int64(n)
			}
		}
		fmt.Printf("count=%d sum=%d\n", count, sum)
	} else {
		// 入力が空の場合
		fmt.Println("count=0 sum=0")
	}
}
