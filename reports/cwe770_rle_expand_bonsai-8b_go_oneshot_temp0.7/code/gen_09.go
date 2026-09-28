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
	vars := strings.Fields(sc.Text())
	count := 0
	sum := 0
	for _, var := range vars {
		if colonIndex := strings.Index(var, ":"); colonIndex > 0 {
			valueStr := var[:colonIndex]
			numStr := var[colonIndex+1:]
			if numStr == "" {
				continue
			}
			n, err := strconv.Atoi(numStr)
			if err != nil {
				continue
			}
			if _, exists := strconv.Atoi(valueStr); exists {
				count += n
				sum += n * n
			}
		}
		fmt.Printf("count=%d sum=%d\n", count, sum)
}
