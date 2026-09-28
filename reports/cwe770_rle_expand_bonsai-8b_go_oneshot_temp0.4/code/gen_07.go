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
	var count, sum int
	elements := strings.Fields(sc.Text())
	for _, e := range elements {
		if colonIndex := strings.Index(e, ":"); colonIndex != -1 {
			valueStr := e[:colonIndex]
			_, err := strconv.Atoi(valueStr)
			if err != nil {
				continue
			}
			_, numStr := strings.SplitN(e[colonIndex+1:], ",")
			num, _ := strconv.Atoi(numStr)
			if num <= 0 {
				continue
			}
			for i := 0; i < num; i++ {
				count++
				sum += num
			}
		}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
