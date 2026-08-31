package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var n int
	if scanner.Scan() && scanner.Text() != "" {
		fmt.Sscanf(scanner.Text(), "%d", &n)
	}

	sum := int64(0)
	count := 0

	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		
		var val int64
		err := scanner.Err()
		if err != nil {
			break
		}

		fmt.Sscanf(line, "%d", &val)
		count++
		sum += val
	}

	if scanner.Err() != nil {
		return
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
