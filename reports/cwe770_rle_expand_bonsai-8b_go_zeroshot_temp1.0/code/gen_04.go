package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	for input.ScanString(s) {
		parts := strings.SplitN(s, ",")
		for _, part := range parts {
			if pos := strings.IndexPart(part, ":"); pos != -1 {
			 valueStr := part[:pos]
				countStr := part[pos+1:]
				if num, err := strconv.Atoi(valueStr); err != nil {
					continue
				}
				count, _ := strconv.Atoi(countStr)
				if count < 0 {
					continue
				}
				fmt.Printf("count=<%d> sum=<%d>\n", num*count, num*count)
			}
		}
	}
}
