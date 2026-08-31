package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	var count int
	var sum64 int64

	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	countStr := line
	count, err = strconv.Atoi(countStr)
	if err != nil {
		return
	}

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		line = line[:len(line)-1] // Remove trailing newline if present
		if len(line) == 0 {
			continue
		}

		numStr := line
		val, err := strconv.ParseInt(numStr, 10, 64)
		if err != nil {
			continue
		}

		count++
		sum64 += val
	}

	fmt.Printf("count=%d sum=%d\n", count, sum64)
}
