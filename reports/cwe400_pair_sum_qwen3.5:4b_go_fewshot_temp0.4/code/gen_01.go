package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	targetStr := ""
	
	for i, line := range sc.Scan() {
		line = strings.TrimSpace(line)
		if i == 0 && line != "" {
			targetStr = line
			break
		}
		if line != "" {
			val, err := strconv.Atoi(line)
			if err == nil {
				numbers = append(numbers, val)
			}
		}
	}

	fmt.Printf("pairs=%d\n", countPairs(targetStr, numbers))
}
