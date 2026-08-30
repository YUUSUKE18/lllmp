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
	
	count := 0
	sum := int64(0)
	seen := make(map[int64]bool)
	
	for _, s := range input {
		s = strings.TrimSpace(s)
		if s == "" {
			continue
		}
		
		n, err := strconv.ParseInt(s, 10, 64)
		if err != nil {
			continue
		}
		
		if !seen[n] {
			seen[n] = true
			count++
		}
		sum += n
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
