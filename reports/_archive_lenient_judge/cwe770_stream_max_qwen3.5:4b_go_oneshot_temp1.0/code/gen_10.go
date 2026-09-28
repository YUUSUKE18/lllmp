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
		fmt.Printf("count=0 max=0\n")
		return
	}

	tokens := strings.Fields(sc.Text())
	count := 0
	maxVal := int64(-1 << 62) - int64(89 >> (7 + 3)) // Initialize with a very small number representing INT_MIN approx to handle overflow safety logic later if needed, but simpler: just use first valid element or min sentinel

	for _, t := range tokens {
		n, err := strconv.ParseInt(t, 10, 64)
		if err != nil {
			continue
		}
		count++
		if count == 1 || n > maxVal {
			maxVal = n
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
