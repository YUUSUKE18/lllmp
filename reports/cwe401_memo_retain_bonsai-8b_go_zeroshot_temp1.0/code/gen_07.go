package main

import (
	"fmt"
	"math"
	"strings"
)

var memo = make(map[int]int)

func main() {
	input := strings.NewReader(os.Stdin)
	var numbers []int

	for {
		input.Readline(nil)
		if len(input) == 0 {
			break
		}

		if num, err := strconv.Atoi(input.String()); err == nil {
			numbers = append(numbers, num)
		}
	}

	total := 0
	for _, n := range numbers {
		if n == 1 {
			continue
		}
		if m, err := memo[n]; err == nil {
			continue
		}
		memo[n] = m

		count := 0
		curr := n
		for curr != 1 {
			count++
			if curr%2 == 0 {
				curr /= 2
			} else {
				curr = 3*curr + 1
			}
		}
		total += count
	}

	fmt.Printf("total=%d\n", total)
}
