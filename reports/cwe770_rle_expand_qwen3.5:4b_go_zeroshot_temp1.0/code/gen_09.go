package main

import (
	"bufio"
	"fmt"
	"io"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	lines, _ := reader.ReadAllLines()
	sum := 0
	count := 0
	for _, line := range lines {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		parts := strings.SplitN(line, ",", 2)
		if len(parts) != 2 {
			continue
		}
		valueStr := strings.TrimSpace(parts[0])
		countStr := strings.TrimSpace(parts[1])
		if valueStr == "" || countStr == "" {
			continue
		}
		value, err := strconv.Atoi(valueStr)
		if err != nil {
			continue
		}
		counts, err := strconv.Atoi(countStr)
		if err != nil || counts < 0 {
			continue
		}
		sum += value * counts
		count += counts
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
