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
	input := sc.Text()
	words := strings.Split(input, ",")
	
	count := 0
	sum := int64(0)
	seen := make(map[int]bool)
	
	for _, w := range words {
		w = strings.TrimSpace(w)
		if w == "" {
			continue
		}
		
		n, err := strconv.Atoi(w)
		if err != nil {
			continue
		}
		
		if seen[n] {
			continue
		}
		
		sum += int64(n)
		count++
		seen[n] = true
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
