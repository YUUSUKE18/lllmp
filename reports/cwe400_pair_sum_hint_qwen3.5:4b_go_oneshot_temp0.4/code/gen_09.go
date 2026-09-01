package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var target int64
	var hasTarget bool

	if sc.Scan() {
		line, _ := sc.Text()
		if line != "" {
			target = 0
			hasTarget = true
			for _, r := range line {
				if '0' <= r && r <= '9' {
					target = target*10 + int64(r-'0')
				} else if r == '-' {
					if len(line) > 1 && '0' <= line[1] && line[1] <= '9' {
						target = -target
					}
				}
			}
		}
	}

	count := int64(0)
	seen := make(map[int64]bool)

	for sc.Scan() {
		line, _ := sc.Text()
		if line == "" {
			continue
		}

		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		complement := target - val
		if seen[complement] {
			count++
		}
		seen[val] = true
	}

	fmt.Printf("pairs=%d\n", count)
}
