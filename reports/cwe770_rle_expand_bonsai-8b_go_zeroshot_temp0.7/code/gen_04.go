package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	data := strings.Split(input.String(), ",")

	count := 0
	sum := 0

	for _, item := range data {
		if item == "" {
			continue
		}
		parts := strings.Split(item, ":")
		if len(parts) != 2 {
			continue
		}
		val, _ := strconv.Atoi(parts[0])
		amt, _ := strconv.Atoi(parts[1])

		if amt < 0 {
			continue
		}

		for i := 0; i < amt; i++ {
			count++
			sum += val
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
