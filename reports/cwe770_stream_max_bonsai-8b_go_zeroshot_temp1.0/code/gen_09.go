package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,4,5,6,7,8,9,10")
	elements := []string{}
	for _, s := range input.Text() {
		if s == "," {
			continue
		}
		elements = append(elements, s)
	}

	count := 0
	maxVal := 0

	for _, s := range elements {
		if num, err := strconv.Atoi(s); err == nil {
			count++
			if num > maxVal {
				maxVal = num
			}
		}
	}

	fmt.Printf("count=<count> max=<maxVal>\n")
}
