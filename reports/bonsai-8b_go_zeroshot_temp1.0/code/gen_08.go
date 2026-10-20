package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("1,2,3,4,4,5,5,5,6,7,8,9,9,10")
	var numbers []int
	for _, s := range input {
		if s == "" {
			continue
		}
		if num, err := strconv.Atoi(s); err == nil {
			numbers = append(numbers, num)
		}
	}

	unique := make(map[int]bool)
	for _, num := range numbers {
		unique[num] = true
	}

	count := len(unique)
	sum := 0
	for _, num := range unique {
		sum += num
	}

	fmt.Println("count=" + fmt.Sprintf("%d", count) + " sum=" + fmt.Sprintf("%d", sum))
}
