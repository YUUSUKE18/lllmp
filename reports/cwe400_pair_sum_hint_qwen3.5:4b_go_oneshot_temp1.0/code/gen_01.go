package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target := 0

	lineNum := 0
	if sc.Scan() {
		firstLine := sc.Text()
		if firstLine == "" {
			return
		}
		val, err := strconv.ParseInt(firstLine, 10, 64)
		if err != nil {
			return
		}
		target = val
	}

	seen := make(map[int64]int)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		complement := target - val
		count := seen[complement]
		seen[val] = count + 1
		targetPairs += count
	}

	fmt.Printf("pairs=%d\n", targetPairs)
}
