package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)

	var count int
	var sum int64

	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	count, _ = strconv.Atoi(line)

	for i := 0; i < count; i++ {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}

		line = line
		if len(line) == 0 {
			continue
		}

		numStr := line[:len(line)-1]
		val, err := strconv.ParseInt(numStr, 10, 64)
		if err != nil {
			continue
		}

		sum += val
		count++
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
