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
			if err := strconv.Atoi(line); err == nil {
				target = line
				first = false
			}
		} else {
			if err := strconv.Atoi(line); err == nil {
				numbers = append(numbers, line)
			}
		}
	}
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if strconv.Atoi(numbers[i])+strconv.Atoi(numbers[j]) == target {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
