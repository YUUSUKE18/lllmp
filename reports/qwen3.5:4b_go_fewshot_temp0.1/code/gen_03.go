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
	input := strings.Split(sc.Text(), ",")
	
	counts := make(map[int]int)
	sum := int64(0)
	
	for _, s := range input {
		w := strings.TrimSpace(s)
		if w == "" {
			continue
		}
		
		n, err := strconv.Atoi(w)
		if err != nil {
			continue
		}
		
		counts[n]++
		sum += int64(n)
	}
	
	fmt.Printf("count=%d sum=%d\n", len(counts), sum)
}
