package main

import (
	"fmt"
	"strconv"
	"strings"
	"unicode"
)

func main() {
	input := strings.NewReader("standard input")
	elements := strings.Split(input.Text, ",")
	
	unique := make(map[int]bool)
	count := 0
	sum := 0
	
	for _, elem := range elements {
		elem = strings.TrimSpace(elem)
		if len(elem) == 0 {
			continue
		}
		if unicode.IsDigit(elem[0]) {
			n, err := strconv.Atoi(elem)
			if err != nil {
				continue
			}
			if !unique[n] {
				unique[n] = true
				count++
				sum += n
			}
		}
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
