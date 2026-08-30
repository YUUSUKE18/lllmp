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
	text := sc.Text()
	fields := strings.Fields(text)
	
	counts := make(map[int]int)
	sum := int64(0)
	
	for _, f := range fields {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		counts[n]++
		sum += int64(n)
	}
	
	fmt.Printf("count=%d sum=%d\n", len(counts), sum)
}
