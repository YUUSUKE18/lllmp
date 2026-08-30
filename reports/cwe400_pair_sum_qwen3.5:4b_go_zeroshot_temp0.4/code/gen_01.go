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

	sumMap := make(map[int64]int)
	count := 0

	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		if len(line) == 0 {
			continue
		}
		var val int64
		fmt.Sscanf(line, "%d", &val)
		if err != nil {
			continue
		}

		diff := target - val
		if c, ok := sumMap[diff]; ok {
			count += c
		}
		sumMap[val]++
	}

	fmt.Printf("pairs=%d\n", count)
}
