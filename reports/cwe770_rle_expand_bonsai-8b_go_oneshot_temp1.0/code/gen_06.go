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
	var count = 0
	var sum = 0
	for _, s := range strings.Fields(sc.Text()) {
		if colonIndex := strings.Index(s, ":"); colonIndex != -1 {
		 valueStr := s[:colonIndex]
			_, err := strconv.Atoi(valueStr)
			if err != nil {
				continue
			}
			_, numStr := strings.SplitN(s[colonIndex+1:], ",")
			num, _ := strconv.Atoi(numStr)
			if num < 0 {
				continue
			}
			if count == 0 || num > count {
				count = num
			}
			sum += num * count
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
