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
		if lineNum == 0 {
			n, err := strconv.ParseInt(line, 10, 64)
			if err != nil {
				continue
			}
			target = n
		} else {
			val, err := strconv.ParseInt(line, 10, 64)
			if err != nil {
				continue
			}
			seen[val] = true
		}
		lineNum++
	}

	count := 0
	for v, seen := range seen {
		complement := target - v
		if complement > v && seen[complement] {
			count++
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
