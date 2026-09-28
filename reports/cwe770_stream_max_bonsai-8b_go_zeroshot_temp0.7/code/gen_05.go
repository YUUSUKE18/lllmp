package main

import (
	"fmt"
	"strconv"
	"strings"
	"unicode"
)

func main() {
	input := strings.NewReader("1,2,3,4,5,6,7,8,9,10")
	elements := []string{}
	for _, s := range input {
		if unicode.IsDigit(s) {
			elem := strings.TrimSpace(string(s))
			if len(elem) > 0 {
				elemNum, err := strconv.Atoi(elem)
				if err == nil && elemNum >= -1 << 63 && elemNum <= 1 << 63 {
				(elements = append(elements, elemNum))
				}
			}
		}
	}

	count := len(elements)
	if count == 0 {
		fmt.Println("count=0 max=0")
		return
	}
	max := elements[0]
	for _, num := range elements[1:] {
		if num > max {
			max = num
		}
	}

	fmt.Printf("count=%d max=%d\n", count, max)
}
