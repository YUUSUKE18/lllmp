package main

import (
	"fmt"
	"math"
	"strings"
)

func main() {
	var numbers []int
	scanner := bufio.NewScanner(os.Stdin)

	for scanner.Scan() {
		s := strings.TrimSpace(scanner.Text())
		if s == "" {
			continue
		}
		if i, err := strconv.Atoi(s); err != nil {
			continue
		}
		numbers = append(numbers, i)
	}

	memo := make(map[int]int)

	total := 0

	for _, n := range numbers {
		if memo[n] != 0 {
			total += memo[n]
			continue
		}
		count := 0
		x := n
		for x != 1 {
			if x%2 == 0 {
				x /= 2
			} else {
				x = 3*x + 1
			}
			count++
		}
		memo[n] = count
		total += count
	}

	fmt.Printf("total=%d\n", total)
}
