package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	targetSum, err := strconv.ParseInt(sc.Scan(), 10, 64)
	if err != nil {
		fmt.Println("pairs=0")
		return
	}

	count := 0
	seen := make(map[int64]bool)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		complement := targetSum - val
		if seen[complement] {
			count++
		}
		seen[val] = true
	}

	fmt.Printf("pairs=%d\n", count)
}
