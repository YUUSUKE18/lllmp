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
	validCount := 0
	for sc.Scan() {
		line := sc.Text()
		parts := strings.Split(strings.TrimSpace(line), ",")
		
		if len(parts) == 0 {
			continue
		}

		valid := true
		for _, part := range parts {
			part = strings.TrimSpace(part)
			if part == "" {
				valid = false
				break
			}
			
			// 数値チェック: 文字列が整数か確認
			_, err := strconv.Atoi(part)
			if err != nil {
				valid = false
				break
			}
		}

		if valid {
			validCount++
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
