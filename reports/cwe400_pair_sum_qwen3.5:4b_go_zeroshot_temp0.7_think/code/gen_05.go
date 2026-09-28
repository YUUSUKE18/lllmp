package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)

	// Read target from the first line/token
	if !scanner.Scan() {
		return
	}
	var target int64
	target, err := strconv.ParseInt(scanner.Text(), 10, 64)
	if err != nil {
		return
	}

	count := int64(0)
	seen := make(map[int64]int64)

	// Process subsequent lines as a stream of integers
	for scanner.Scan() {
		valStr := scanner.Text()
		val, err := strconv.ParseInt(valStr, 10, 64)
		if err != nil {
			continue // Ignore non-integer lines/values
		}

		needed := target - val
		if c, ok := seen[needed]; ok {
			count += c
		}
		seen[val]++
	}

	fmt.Println("pairs=" + fmt.Sprintf("%d", count))
}
