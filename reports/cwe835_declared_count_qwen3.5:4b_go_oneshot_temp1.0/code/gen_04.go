package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var count int
	var total int64
	var hasInput bool

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		hasInput = true
		count++
		total += int64(n)
	}

	if hasInput {
		fmt.Printf("count=%d sum=%d\n", count, total)
	} else {
		fmt.Println()
	}
}
