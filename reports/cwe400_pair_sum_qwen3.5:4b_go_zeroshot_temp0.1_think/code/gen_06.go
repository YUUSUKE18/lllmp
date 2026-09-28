package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	var target int64
	foundTarget := false
	
	count := int64(0)
	seen := make(map[int64]int64)
	
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}
		
		if !foundTarget {
			target = val
			foundTarget = true
		} else {
			needed := target - val
			if neededVal, ok := seen[needed]; ok {
				count += neededVal
			}
			seen[val]++
		}
	}
	
	fmt.Printf("pairs=%d\n", count)
}
