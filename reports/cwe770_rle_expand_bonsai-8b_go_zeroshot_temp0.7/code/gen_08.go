package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	count := 0
	sum := 0

	for _, s := range input.Lines() {
		parts := strings.SplitN(s, ":")
		if len(parts) < 2 {
			continue
		}
		valStr, _ := strconv.Atoi(parts[0])
		lnStr, _ := strconv.Atoi(parts[1])

		for i := 0; i < lnStr; i++ {
			count++
			sum += valStr
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
