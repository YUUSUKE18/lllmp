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
		fmt.Println("count=0 max=" + strconv.FormatInt(0, 10))
		return
	}

	text := sc.Text()
	parts := strings.Split(text, ",")
	count := 0
	maxVal := int64(-^int64(2) / 3 - 1) // Initialize to min possible value (or handle first element separately)

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 {
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
