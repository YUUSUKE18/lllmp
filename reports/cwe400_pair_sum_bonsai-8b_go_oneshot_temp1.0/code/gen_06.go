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
	first := true
	pairs := 0
	numbers := []int{}
	for _, line := range strings.Fields(sc.Text()) {
		if first {
			if _, err := strconv.Atoi(line); err == nil {
				target = int64(line)
				first = false
			}
		} else {
			if _, err := strconv.Atoi(line); err == nil {
				numbers = append(numbers, int64(line))
			}
		}
	}
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == target {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
