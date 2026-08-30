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
	if !sc.Scan() {
		fmt.Println("count=0 max=" + strconv.Itoa(0))
		return
	}

	input := sc.Text()
	parts := strings.Split(input, ",")
	maxVal := int64(-1e38 - 1) // Initialize with a value smaller than min int64
	count := 0

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 || !strings.ContainsAny(part, "-0123456789") {
			continue
		}
		
		val, err := strconv.ParseInt(part, 10, 64)
		if err != nil {
			continue
		}

		count++
		if count == 1 || val > maxVal {
			maxVal = val
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
