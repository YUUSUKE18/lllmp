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

	text := sc.Text()
	fields := strings.Fields(text)
	count := 0
	maxVal := int64(-1<<63 - 2) // Initialize with a value smaller than min int64 to ensure first update, or handle empty case separately. 
								// Actually, simpler: initialize maxVal to the smallest possible int64 and use a flag for first element.

	first := true
	for _, f := range fields {
		n, err := strconv.ParseInt(f, 10, 64)
		if err != nil {
			continue
		}
		count++
		if !first || n > maxVal {
			maxVal = n
			first = false
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
