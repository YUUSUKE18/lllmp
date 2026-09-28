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
		fmt.Printf("count=0 max=" + fmt.Sprintf("%v", int64(0)) + "\n")
		return
	}

	text := sc.Text()
	parts := strings.Split(text, ",")
	count := 0
	maxVal := int64(-1) // Initialize with a value that indicates not set yet. Since input can be empty or invalid numbers only, we need to handle the case where no valid integers are found.

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 || part[0] != '-' && (part[1:] == "" || !isDigit(part)) { // Check if it's a negative number or positive number starting with digit
			continue 
		}

		n, err := strconv.ParseInt(part, 10, 64)
		if err != nil {
			continue
		}

		count++
		if maxVal == int64(-1) || n > maxVal {
			maxVal = n
		}
	}

	fmt.Printf("count=%d max=" + fmt.Sprintf("%v", maxVal) + "\n")
}

func isDigit(s string) bool {
	for _, c := range s {
		if !('0' <= c && c <= '9') {
			return false
		}
	}
	return true
}
