package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	count := 0
	sum := 0

	for _, s := range input {
		parts := strings.SplitN(s, ":")
		if len(parts) != 2 {
			continue
		}
	 valueStr, _ := parts[0]
		_, err := strconv.Atoi(valueStr)
		if err != nil {
			continue
		}
		countStr, _ := parts[1]
		_, err = strconv.Atoi(countStr)
		if err != nil {
			continue
		}
		if err == nil && countStr == "" {
			continue
		}
		if countStr == "0" {
			continue
		}
		count += countStr
		sum += valueStr * count
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
