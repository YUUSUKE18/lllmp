package main

import (
	"fmt"
	"strings"
	"strconv"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	for {
		input, _ = input.Readline()
		if input == "" {
			break
		}
		elements := strings.Fields(input)
		count := 0
		sum := 0
		for _, element := range elements {
			if colonIndex := strings.Index(element, ":"); colonIndex != -1 {
				valueStr := element[:colonIndex]
				countStr := element[colonIndex+1:]
				if idx, err := strconv.Atoi(valueStr); err == nil {
					count += countStr
					if idx, err := strconv.Atoi(countStr); err == nil {
						if idx > 0 {
							sum += idx * count
						}
					}
				}
			}
		}
		fmt.Printf("count=%d sum=%d\n", count, sum)
	}
}
