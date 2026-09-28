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

	counts := make(map[int64]int)
	pairsCount := 0

	for {
		line, _ := reader.ReadString('\n')
		if len(line) == 0 {
			continue
		}
		var val int64
		fmt.Sscanf(line, "%d", &val)
		if err != nil {
			continue
		}

		if remainder := target - val; rem, ok := counts[remainder]; ok {
			pairsCount += rem
		}
		counts[val]++
	}

	fmt.Printf("pairs=%d\n", pairsCount)
}
