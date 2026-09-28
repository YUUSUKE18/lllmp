package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var count int
	var sum int64 = 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		parts := []string{}
		for _, s := range splitIntegers(line) {
			v, err := strconv.ParseInt(s, 10, 64)
			if err != nil {
				continue
			}
			count++
			sum += v
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}

func splitIntegers(line string) []string {
	result := []string{}
	start := 0
	for i := 0; i < len(line); i++ {
		if line[i] == ' ' || line[i] == '\t' || line[i] == '\n' || line[i] == '\r' {
			if start < i {
				result = append(result, line[start:i])
			}
			start = i + 1
		}
	}
	if start < len(line) {
		result = append(result, line[start:])
	}
	return result
}
