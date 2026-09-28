package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	var target int64
	reader := bufio.NewReader(os.Stdin)

	fmt.Sscanf(reader.ReadString(), "%d", &target)

	count := int64(0)
	sum := int64(0)
	found := map[int64]bool{}

	lineNum := 1
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		if len(line) == 0 || line[len(line)-1] == '\n' && line[:len(line)-1] == "" {
			continue
		}

		var num int64
		fmt.Sscanf(line, "%d", &num)
		if err := fmt.Scan(&num); err != nil {
			continue
		}

		targetSum := target - num
		if found[targetSum] {
			count++
		} else if targetSum == 0 && num == 0 {
			count--
		}

		found[num] = true
		sum += num
	}

	fmt.Printf("pairs=%d\n", count)
}
