package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	target := 0
	var first := true
	pairs := 0
	numbers := []int{}

	for _, line := range strings.Fields(sc.Text()) {
		if len(line) == 0 {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		numbers = append(numbers, n)

		if first {
			first = false
		} else {
			for i := 0; i < len(numbers); i++ {
				for j := i + 1; j < len(numbers); j++ {
					if numbers[i]+numbers[j] == target {
						pairs++
					}
				}
			}
		}
	}

	fmt.Printf("pairs=%d\n", pairs)
}
