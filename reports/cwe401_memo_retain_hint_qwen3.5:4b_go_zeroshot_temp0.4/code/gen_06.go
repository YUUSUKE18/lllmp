package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	memo := make(map[int64]int)
	total := 0

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		line = stringReader(line)
		if len(line) == 0 {
			continue
		}
		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		step := calculateSteps(n, memo)
		total += step
	}

	fmt.Printf("total=%d\n", total)
}

func stringReader(s string) string {
	var sb strings.Builder
	s = strings.TrimSpace(s)
	if len(s) == 0 {
		return ""
	}
	for _, r := range s {
		if r >= '0' && r <= '9' {
			sb.WriteRune(r)
		}
	}
	return sb.String()
}

func calculateSteps(n int64, memo map[int64]int) int {
	if n == 1 {
		return 0
	}
	if val, ok := memo[n]; ok {
		return val
	}

	var step int
	if n%2 == 0 {
		step = calculateSteps(n/2, memo)
	} else {
		step = calculateSteps(3*n+1, memo)
	}
	memo[n] = step + 1
	return step + 1
}
