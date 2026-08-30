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

	parts := strings.Split(sc.Text(), ",")
	count := 0
	maxVal := int64(-^int64(2) - 1) // Initialize with minimal possible value for int64 range (or handle empty case separately if preferred, but here logic handles it)
	first := true

	for _, p := range parts {
		s := strings.TrimSpace(p)
		if s == "" {
			continue
		}
		
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue
		}
		
		count++
		if first || n > maxVal {
			maxVal = n
			first = false
		}
	}

	fmt.Printf("count=%d max=%d\n", count, maxVal)
}
