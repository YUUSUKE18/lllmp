package main

import (
	"fmt"
	"strconv"
	"os"
)

func main() {
	count := 0
	sum := 0

	for {
		line, _ := os.ReadLine(os.Stdin)
		if !line {
			break
		}
		if len(line) == 0 {
			continue
		}
		countStr, _ := strconv.Atoi(line)
		if countStr <= 0 {
			continue
		}
		count += countStr
		for {
			nextLine, _ := os.ReadLine(os.Stdin)
			if !nextLine {
				break
			}
			if len(nextLine) == 0 {
				continue
			}
			if err := strconv.Atoi(nextLine); err == nil {
				sum += nextLine
			}
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
