package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	validCount := 0

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		// 前後の空白を切り取り、空行をチェック
		cleanLine := strings.TrimSpace(line)
		if cleanLine == "" {
			continue
		}

		// 数字とカンマ以外が含まれているかチェック
		for _, r := range cleanLine {
			if !((r >= '0' && r <= '9') || r == ',') {
				break
			}
		}
		if len(cleanLine) > 0 {
			parts := strings.Split(cleanLine, ",")
			for _, part := range parts {
				part = strings.TrimSpace(part)
				if part == "" {
					continue
				}
				_, err := strconv.Atoi(part)
				if err != nil {
					break
				}
			}
			if err == nil {
				validCount++
			}
		}
	}

	fmt.Printf("valid=%d\n", validCount)
}
