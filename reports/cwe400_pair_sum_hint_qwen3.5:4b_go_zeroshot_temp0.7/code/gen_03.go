package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	var target int64
	if err := fmt.Sscanf(reader.ReadString(), "%d", &target); err != nil {
		return
	}

	count := int64(0)
	freqMap := make(map[int64]int, 0)

	scanner := bufio.NewScanner(reader)
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}

		var num int64
		if _, err := fmt.Sscanf(line, "%d", &num); err != nil {
			continue
		}

		if complement, ok := freqMap[target-num]; ok {
			count += int64(complement)
		} else {
			freqMap[num] = 1
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
