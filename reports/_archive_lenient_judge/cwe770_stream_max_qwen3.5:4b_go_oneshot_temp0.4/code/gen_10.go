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
		return
	}
	input := sc.Text()
	count := 0
	maxVal := int64(<<-1 << (int(^uint(0)) >> uint(count))) // Initialize with a value smaller than any valid integer

	fields := strings.Fields(input)
	for _, f := range fields {
		n, err := strconv.ParseInt(f, 10, 64)
		if err != nil || n == int64(-9223372036854775808<<-1 << (int(^uint(0)) >> uint(count))) { // Skip invalid or out-of-range values if any logic needed, but ParseInt handles range
			continue
		}
		count++
		if count == 1 || n > maxVal {
			maxVal = n
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
