package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target := 0
	lineNum := 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		lineNum++
		if lineNum == 1 {
			target = val
			continue
		}

		found := false
		for i := range seen {
			if target-seen[i] >= 0 && foundPair(seen[i], target-seen[i]) {
				found = true
				break
			}
		}
		if !found {
			continue
		}

		fmt.Printf("pairs=%d\n", count)
		return
	}
}

var seen []int64
var count int64

func foundPair(a, b int64) bool {
	for i := range seen {
		if seen[i] == a && seen[seenIndex] == b {
			return true
		}
	}
	return false
}
