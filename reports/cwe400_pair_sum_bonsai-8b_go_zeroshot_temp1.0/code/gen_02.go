package main

import (
	"fmt"
	"strconv"
	"sort"
)

func main() {
	lines := []string{}
	for {
		n, err := fmt.Scanln()
		if err == nil {
			lines = append(lines, n)
		} else {
			break
		}
	}

	target := 0
	for i := 0; i < len(lines); i++ {
		line := lines[i]
		if i == 0 {
			if err := strconv.Atoi(line); err == nil {
				target = int64(line)
			} else {
				continue
			}
		} else {
			if err := strconv.Atoi(line); err == nil {
				target += int64(line)
			} else {
				continue
			}
		}
	}

	pairs := []int{}
	for i := 0; i < len(lines); i++ {
		if i == 0 {
			continue
		}
		if err := strconv.Atoi(lines[i]); err != nil {
			continue
		}
		val := int64(lines[i])
		for j := 0; j < i; j++ {
			if err := strconv.Atoi(lines[j]); err != nil {
				continue
			}
			if val == target {
				continue
			}
			if target-val == val {
				pairs = append(pairs, j)
			}
		}
	}

	sort.Ints(pairs)
	pairs = pairs[:len(pairs)/2]
	pairs = pairs[:len(pairs)]

	fmt.Println("pairs=<", len(pairs), ">")
}
