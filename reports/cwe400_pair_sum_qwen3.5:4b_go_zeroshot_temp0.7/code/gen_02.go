package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	var target int64
	if _, err := fmt.Fscan(reader, &target); err != nil {
		os.Exit(1)
	}

	count := int64(0)
	numbers := make([]int64, 0, 1000000)

	for {
		var num int64
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		if line == "" {
			continue
		}
		fmt.Sscanf(line, "%d", &num)
		if err != nil {
			continue
		}

		for i := range numbers {
			if target-numbers[i]-num >= 0 && target-numbers[i]-num <= num {
				count++
			}
		}
		numbers = append(numbers, num)
	}

	fmt.Printf("pairs=%d\n", count)
}
