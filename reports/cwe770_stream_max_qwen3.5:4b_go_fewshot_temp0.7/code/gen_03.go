package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	count := 0
	maxVal := int64(-1<<63 - 1) // Initialize with minimum possible value for int64
	firstNum := true
	
	for _, w := range strings.Split(sc.Text(), ",") {
		parsedStr := strings.TrimSpace(w)
		if len(parsedStr) == 0 {
			continue
		}

		n, err := strconv.ParseInt(parsedStr, 10, 64)
		if err != nil {
			continue
		}

		count++
		if firstNum || n > maxVal {
			maxVal = n
			firstNum = false
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
