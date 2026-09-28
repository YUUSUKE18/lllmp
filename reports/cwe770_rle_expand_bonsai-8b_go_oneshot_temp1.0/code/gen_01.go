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
	var result strings
	var count int
	var sum int
	for _, s := range strings.Fields(sc.Text()) {
		if colonIndex := strings.IndexRune(s, ':'); colonIndex == -1 {
			continue
		}
		valueStr, valueStr := s[:colonIndex], s[colonIndex+1:]
		_, err := strconv.Atoi(valueStr)
		if err != nil {
			continue
		}
		count, sum = count+1, sum+int64(err)
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
