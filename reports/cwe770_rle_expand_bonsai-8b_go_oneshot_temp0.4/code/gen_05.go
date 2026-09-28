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
			_, numStr := strings.Split(valueStr, ":")
			num, _ := strconv.Atoi(numStr)
			if num < 0 {
				continue
			}
			if count == 0 {
				count = num
			} else {
				count += num
			}
			sum += num * count
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
