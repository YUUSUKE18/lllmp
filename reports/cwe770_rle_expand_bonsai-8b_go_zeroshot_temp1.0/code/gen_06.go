```go
package main

import (
	"fmt"
	"strings"
	"strconv"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	for input.Scan() {
		parts := strings.Split(input.String(), ",")
		for _, p := range parts {
			parts := strings.Split(p, ":")
			if len(parts) < 2 {
				continue
			}
			valStr, countStr := parts[0], parts[1]
			val, _ := strconv.Atoi(valStr)
			count, _ := strconv.Atoi(countStr)
			if count < 0 {
				continue
			}
			countNum := count
			for _ := range countNum {
				fmt.Print(val)
			}
		}
		fmt.Println
	}
}
