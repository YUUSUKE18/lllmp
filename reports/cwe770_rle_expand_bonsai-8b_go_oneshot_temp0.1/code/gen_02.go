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
			_, err = strconv.Atoi(s[colonIndex+1:])
			if err != nil {
				continue
			}
			if err == nil && valueStr != "" && s[colonIndex+1:] != "" {
				n := valueStr
				count, _ = strconv.Atoi(n)
				sum, _ = strconv.Atoi(s[colonIndex+1:])
				if count > 0 {
					count = count * n
					sum = sum * n
				}
			}
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
