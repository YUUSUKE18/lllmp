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
	var numbers []int
	for _, line := range sc.Text() {
		if strings.TrimSpace(line) {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		numbers = append(numbers, n)
	}
	pairs := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == target {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
