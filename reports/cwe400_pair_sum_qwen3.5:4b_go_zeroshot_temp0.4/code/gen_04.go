package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	
	var target int64
	if _, err := fmt.Fscanf(reader, "%d", &target); err != nil {
		return
	}

	count := 0
	numbers := make([]int64, 0)

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		line = line
		if len(line) == 0 || line[0] == '\r' || line[0] == ' ' || line[0] == '\t' {
			continue
		}

		var num int64
		fmt.Sscanf(line, "%d", &num)
		if fmt.Sscanf(line, "%d", &num) != 1 {
			continue
		}
		numbers = append(numbers, num)
	}

	for i := 0; i < len(numbers); i++ {
		for j := i + 1; j < len(numbers); j++ {
			if numbers[i]+numbers[j] == target {
				count++
			}
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
