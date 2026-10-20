package main

import (
	"fmt"
	"strconv"
	"strings"
	"unicode"
)

func main() {
	var numbers []int
	input := strings.NewReader("Enter integers separated by commas: ")
	fmt.Print(input)
	input.Scan()

	for _, s := range input.Lines() {
		s = strings.TrimSpace(s)
		if s == "" {
			continue
		}
		if unicode.IsDigit(s[0]) {
			n, err := strconv.Atoi(s)
			if err == nil {
				numbers = append(numbers, n)
			}
		}
	}

	unique := make(map[int]bool)
	sum := 0
	count := 0

	for _, n := range numbers {
		if !unique[n] {
			unique[n] = true
			sum += n
			count++
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
