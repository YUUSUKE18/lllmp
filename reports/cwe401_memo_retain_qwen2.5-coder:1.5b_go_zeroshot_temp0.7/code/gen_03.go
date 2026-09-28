package main

import (
	"fmt"
	"sort"
)

func main() {
	var total int
	input := make([]int, 0)
	for {
		line, _ := fmt.Scanln()
		if line == "" {
			break
		}
		num, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if num == 1 {
			total += 0
			break
		}
		count := 0
		for num != 1 {
			if num%2 == 0 {
				num /= 2
			} else {
				num = 3*num + 1
			}
			count++
		}
		total += count
	}
	fmt.Printf("total=%d\n", total)
}
