package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	elements := map[int]int{}
	for _, s := range input.Text {
		if s == ',' {
			continue
		}
		parts := strings.SplitN(s, ":", 2)
		if len(parts) == 2 {
			val, _ := strconv.Atoi(parts[0])
			cnt, _ := strconv.Atoi(parts[1])
			if cnt > 0 {
				elements[val] += cnt
			}
		}
	}

	count := 0
	sum := 0
	for val := range elements {
		count += val
		sum += val * elements[val]
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
