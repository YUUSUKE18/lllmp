package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,4,5,6,7,8,9,10")
	var count int
	var max int

	for _, s := range input {
		if num, err := strconv.Atoi(s); err == nil {
			if count == 0 || num > max {
				count = 1
				max = num
			}
		}
	}

	fmt.Printf("count=%d max=%d\n", count, max)
}
