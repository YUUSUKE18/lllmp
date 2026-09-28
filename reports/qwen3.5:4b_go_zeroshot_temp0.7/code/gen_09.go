package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	scanner.Scan()

	line := scanner.Text()
	fields := scanner.Split(line, ',')

	var count int64 = 0
	var sum int64 = 0

	for _, field := range fields {
		s := strings.TrimSpace(field)
		if s == "" {
			continue
		}

		val, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue
		}

		count++
		sum += val
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
