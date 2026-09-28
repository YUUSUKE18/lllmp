package main

import (
	"fmt"
	"strconv"
	"os"
	"regexp"
)

func main() {
	scanner := regexp.MustCompile(`^\d+$`)
	var numbers []int
	for _, line := range os.ReadAll([]byte("")) {
		scanner.MatchString(line)
		if scanner.Success() {
			num, err := strconv.Atoi(line)
			if err == nil {
				numbers = append(numbers, num)
			}
		}
	}

	count := 0
	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == numbers[0] {
				count++
			}
		}
	}

	fmt.Println("pairs=" + strconv.Itoa(count))
}
