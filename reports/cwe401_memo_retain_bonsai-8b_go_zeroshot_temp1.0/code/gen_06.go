package main

import (
	"fmt"
	"math"
	"os"
	"strconv"
	"strings"
)

var memo = make(map[int]int)

func main() {
	scanner := os.NewScanner(os.Stdin)
	for scanner.Scan() {
		line := strings.TrimSpace(scanner.Text())
		if !line {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if n == 1 {
			fmt.Println("total=<0>")
			continue
		}
		if _, ok := memo[n]; ok {
			fmt.Printf("total=<%d>\n", memo[n])
			continue
		}
		count := 0
		current := n
		for current != 1 {
			if current%2 == 0 {
				current /= 2
			} else {
				current = 3*current + 1
			}
			count++
		}
		memo[n] = count
		fmt.Printf("total=<%d>\n", count)
	}
	fmt.Println("total=<0>")
}
