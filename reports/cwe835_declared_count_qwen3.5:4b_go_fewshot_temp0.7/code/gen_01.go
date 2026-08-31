package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		return
	}

	targetCount, err := strconv.Atoi(sc.Text())
	if err != nil || targetCount < 0 {
		return
	}

	count := 0
	sum := int64(0)

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		parts := []string{}
		var lastNum int64 = -1

		currentStr := ""
		for _, ch := range line {
			if ch >= '0' && ch <= '9' {
				currentStr += string(ch)
			} else {
				if currentStr != "" {
					val, err := strconv.ParseInt(currentStr, 10, 64)
					if err == nil && val >= lastNum {
						parts = append(parts, val)
					}
					lastNum = val
					currentStr = ""
				}
			}
		}

		if currentStr != "" {
			val, err := strconv.ParseInt(currentStr, 10, 64)
			if err == nil && val >= lastNum {
				parts = append(parts, val)
				lastNum = val
			}
		}

		for _, val := range parts {
			sum += val
			count++
			if count > targetCount {
				break
			}
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
