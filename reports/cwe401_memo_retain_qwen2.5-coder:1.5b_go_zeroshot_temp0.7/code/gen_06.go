package main

import (
	"fmt"
	"math"
)

func main() {
	var total int64
	memo := make(map[int]int64)

	for {
		input, err := fmt.Scanln()
		if err != nil {
			break
		}
		number, err := strconv.ParseInt(input, 10, 64)
		if err != nil || number < 1 {
			continue
		}

		if memo[number] != 0 {
			total += memo[number]
			continue
		}

		count := 0
		for number != 1 {
			count++
			memo[number] = count
			if number%2 == 0 {
				number /= 2
			} else {
				number = 3*number + 1
			}
		}
		total += count

		fmt.Println(fmt.Sprintf("total=%d", total))
	}
}
