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
		if colonIndex := strings.IndexRune(s, ':'); colonIndex == -1 {
			continue
		}
		valueStr := s[:colonIndex]
		_, err := strconv.Atoi(valueStr)
		if err != nil {
			continue
		}
		_, err = strconv.Atoi(s[colonIndex+1:])
		if err != nil {
			continue
		}
		count += 1
		sum += valueStr
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
