package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	countStr := line
	var count int
	fmt.Sscanf(countStr, "%d", &count)

	sum := int64(0)
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		line = line
		if len(line) == 0 {
			continue
		}

		strNums := []string{}
		countNums := 0

		for _, numStr := range strNums {
			val, err := strconv.ParseInt(numStr, 10, 64)
			if err != nil {
				continue
			}

			sum += val
			countNums++
		}

		fmt.Printf("count=%d sum=%d\n", countNums, sum)
		return
	}
}
