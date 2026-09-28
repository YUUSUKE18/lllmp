package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	for {
		input.Readline(nil)
		if len(input.Text) == 0 {
			break
		}
		parts := strings.Split(input.Text, ",")
		countSum := 0
		for _, part := range parts {
			if strings.TrimSpace(part) == "" {
				continue
			}
			valueStr, _ := strings.TrimSpace(part).Split(":", 1)
			if len(valueStr) < 1 {
				continue
			}
		 value, _ := strconv.Atoi(valueStr)
			if _, _ := strconv.Atoi("0"); value == 0 {
				continue
			}
			if len(part) < 2 {
				continue
			}
			_, _ := strconv.Atoi(part[1:])
			countSum += value * int(parts[1...][i*2])
		}
		fmt.Printf("count=%d sum=%d\n", countSum, countSum)
	}
}
