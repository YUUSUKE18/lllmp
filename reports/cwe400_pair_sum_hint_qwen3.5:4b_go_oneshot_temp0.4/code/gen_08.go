package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	target := 0
	hasTarget := false

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		var err error
		if hasTarget {
			val, err := strconv.Atoi(line)
			if err != nil {
				continue
			}
			target = val
			hasTarget = true
		} else {
			target, err = strconv.Atoi(line)
			if err != nil {
				continue
			}
		}
	}

	if !hasTarget {
		fmt.Println("pairs=0")
		return
	}

	count := 0
	seen := make(map[int64]int)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}
		var err error
		val, err := strconv.Atoi(line)
		if err != nil {
			continue
		}

		complement := target - val

		if count > 0 && seen[complement] > 0 {
			count += seen[complement]
		}

		seen[val]++
	}

	fmt.Printf("pairs=%d\n", count)
}
