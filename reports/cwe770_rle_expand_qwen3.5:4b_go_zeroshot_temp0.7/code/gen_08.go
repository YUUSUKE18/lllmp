package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var totalElements, totalSum int64

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		parts := splitComma(line)
		for _, part := range parts {
			if part == "" {
				continue
			}
			items := splitColon(part)
			if len(items) != 2 {
				continue
			}

			value, errVal := strconv.ParseInt(items[0], 10, 64)
			count, errCount := strconv.ParseInt(items[1], 10, 64)

			if errVal != nil || errCount != nil {
				continue
			}

			if count < 0 {
				continue
			}

			totalElements += count
			totalSum += value * count
		}
	}

	fmt.Printf("count=%d sum=%d\n", totalElements, totalSum)
}

func splitComma(s string) []string {
	res := make([]string, 0)
	start := 0
	for i := 0; i < len(s); i++ {
		if s[i] == ',' {
			res = append(res, s[start:i])
			start = i + 1
		}
	}
	res = append(res, s[start:])
	return res
}

func splitColon(s string) []string {
	idx := -1
	for i := 0; i < len(s); i++ {
		if s[i] == ':' {
			idx = i
			break
		}
	}
	if idx == -1 {
		return nil
	}
	res := make([]string, 2)
	res[0] = s[:idx]
	res[1] = s[idx+1:]
	return res
}
