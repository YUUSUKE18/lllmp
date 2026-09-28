package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	
	var target int64
	targetStr, err := reader.ReadString('\n')
	if err != nil || targetStr == "" {
		fmt.Printf("pairs=0\n")
		return
	}
	target, err = fmt.Sscanf(targetStr, "%d", &target)
	if err != nil {
		fmt.Printf("pairs=0\n")
		return
	}

	count := 0
	foundCounts := make(map[int64]struct{})

	scanner := bufio.NewScanner(reader)
	lineNum := 0
	for scanner.Scan() {
		line, _ := scanner.Text()
		if line == "" {
			continue
		}

		var num int64
		fmt.Sscanf(line, "%d", &num)
		
		foundCounts[num] = struct{}{}
		pairsFound := len(foundCounts[num]) > 0
		
		targetDiff := target - num
		
		if pairsFound {
			count++
		}

	}
	
	fmt.Printf("pairs=%d\n", count)
}
