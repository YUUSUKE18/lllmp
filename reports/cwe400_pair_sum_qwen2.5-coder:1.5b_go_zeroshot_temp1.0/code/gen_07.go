package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	r := bufio.NewReader(os.Stdin)
	defer r.Close()

	var target int
	fmt.Scan(&target)

	var count int
	var current int
	var seen map[int]int

	for _, line := range r {
		current, _ = fmt.ParseInt(line, 10, 64)
		if seen != nil {
			if _, ok := seen[current]; ok {
				count++
			}
		}
		seen[current] = 1
	}

	fmt.Printf("pairs=%d\n", count)
}
