package main

import (
	"fmt"
	"math"
)

func main() {
	var total int
	mem := make(map[int]int)
	for {
		var n int
		_, err := fmt.Scan(&n)
		if err != nil {
			break
		}
		if n == 1 {
			total += 0
			break
		}
		if val, ok := mem[n]; ok {
			total += val
			continue
		}
		var count int
		for n != 1 {
			count++
			if n%2 == 0 {
				n /= 2
			} else {
				n = 3*n + 1
			}
			if val, ok := mem[n]; ok {
				count += val
				break
			}
		}
		mem[n] = count
		total += count
	}
	fmt.Println("total=", total)
}
