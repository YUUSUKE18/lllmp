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
	var count int
	var sum int
	elements := strings.Fields(sc.Text())
	for _, e := range elements {
		if colonIndex := strings.Index(e, ":"); colonIndex != -1 {
			valueStr := e[:colonIndex]
			_, err := strconv.Atoi(valueStr)
			if err != nil {
				continue
			}
			_, err = strconv.Atoi(e[colonIndex+1:])
			if err != nil {
				continue
			}
			count += 1
			sum += valueStr
			_, err = strconv.Atoi(e[colonIndex+1:])
			if err != nil {
				continue
			}
			sum += valueStr
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
