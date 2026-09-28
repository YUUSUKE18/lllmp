package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	countLine, err := sc.Scan()
	if err != nil {
		return
	}

	expectedCount, err := strconv.Atoi(countLine)
	if err != nil || expectedCount < 0 {
		expectedCount = 0
	}

	var sum int64 = 0
	actualCount := 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		n, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue
		}

		sum += n
		actualCount++
	}

	fmt.Printf("count=%d sum=%d\n", actualCount, sum)
}
