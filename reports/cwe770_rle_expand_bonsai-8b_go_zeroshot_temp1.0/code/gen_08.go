package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {
	input := strings.NewReader("7:3,2:2")
	for input.Read() {
		line := strings.TrimSpace(input.String())
		parts := strings.Split(line, ",")
		countSum := 0
		total := 0
		for _, part := range parts {
			if len(part) == 0 {
				continue
			}
			split := strings.SplitN(part, ":", 2)
			if len(split) != 2 {
				continue
			}
			valStr, err := split[0]
			if err != nil {
				continue
			}
			num, err := strconv.Atoi(valStr)
			if err != nil {
				continue
			}
			_, err = strconv.Atoi(split[1])
			if err != nil {
				continue
			}
			countSum += num
			total += num * num
		}
		fmt.Printf("count=<%d> sum=<%d>\n", countSum, total)
	}
}
