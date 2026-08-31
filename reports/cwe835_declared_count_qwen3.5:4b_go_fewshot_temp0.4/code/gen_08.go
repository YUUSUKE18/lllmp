package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	countLine, _ := sc.Scan()
	if countLine == 0 {
		return
	}

	expectedCount, err := strconv.Atoi(countLine.(string))
	if err != nil {
		return
	}

	var actualCount int
	var sum int64 = 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		parts := []string{}
		for _, part := range splitInts(line) {
			val, err := strconv.ParseInt(part, 10, 64)
			if err != nil {
				continue
			}
			sum += val
			actualCount++
		}
	}

	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}

func splitInts(line string) []string {
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
