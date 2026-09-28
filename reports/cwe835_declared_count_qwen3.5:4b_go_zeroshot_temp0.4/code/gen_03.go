package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}
	countStr := line
	count := 0
	for _, r := range countStr {
		if r >= '0' && r <= '9' {
			count = count * 10 + int(r-'0')
		}
	}

	sum := int64(0)
	scanner := bufio.NewScanner(reader)
	for scanner.Scan() {
		line, err := scanner.ReadString('\n')
		if err != nil {
			continue
		}
		if line == "" {
			continue
		}
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		sum += val
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
