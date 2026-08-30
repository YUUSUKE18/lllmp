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
		fmt.Printf("count=0 max=" + strconv.FormatInt(0, 10) + "\n")
		return
	}
	
	text := sc.Text()
	parts := strings.Split(text, ",")
	count := 0
	maxVal := int64(-9223372036854775808 - 1) // Initialize to a value smaller than min int64
	
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
