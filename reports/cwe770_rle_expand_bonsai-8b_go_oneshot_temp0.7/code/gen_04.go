package main

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	sc.Scan()
	var count = 0
	var sum = 0
	for _, s := range strings.Fields(sc.Text()) {
		if colonIndex := strings.Index(s, ":"); colonIndex > 0 {
		 valueStr := s[:colonIndex]
			numStr := s[colonIndex+1:]
			n, err := strconv.Atoi(numStr)
			if err != nil {
				continue
			}
			count += n
			sum += n * n
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
