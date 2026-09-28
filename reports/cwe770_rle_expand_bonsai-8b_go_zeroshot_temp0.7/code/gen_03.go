package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	var elements []int
	var counts []int

	for _, s := range input {
		parts := strings.SplitN(s, ":")
		if len(parts) != 2 {
			continue
		}
		valStr, _ := strconv.Atoi(parts[0])
		amtStr, _ := strconv.Atoi(parts[1])

		if valStr <= 0 || amtStr <= 0 {
			continue
		}

		for i := 0; i < amtStr; i++ {
		(elements = append(elements, valStr))
			counts = append(counts, 1)
		}
	}

	count := 0
	sum := 0

	for i := 0; i < len(elements); i++ {
		count += counts[i]
		sum += elements[i]
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
