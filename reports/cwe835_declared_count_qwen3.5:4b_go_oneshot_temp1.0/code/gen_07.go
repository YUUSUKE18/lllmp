package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var n int
	if !sc.Scan() {
		return
	}
	n, err := strconv.Atoi(sc.Text())
	if err != nil || n < 0 {
		return
	}
	count := 0
	sum := int64(0)
	for sc.Scan() {
		line := sc.Text()
		parts := []string{}
		for _, c := range line {
			if c == ' ' || c == '\t' || c == '\n' || c == '\r' {
				continue
			}
			parts = append(parts, string(c))
		}
		var value int64
		switch len(parts) {
		case 0:
			continue
		default:
			for _, f := range parts {
				if i, err := strconv.ParseInt(f, 10, 64); err == nil {
					value = i
					break
				}
			}
		}
		if value != 0 {
			count++
			sum += value
		} else if len(parts) > 0 && (len(parts[0]) == 1 && string(parts[0]) == "0") {
			count++
			continue
		} else if len(parts) > 0 && parts[0][0] != '-' && len(parts[0]) == 2 && parts[0][1] >= '0' && parts[0][1] <= '9' {
			if val, err := strconv.ParseInt(parts[0], 10, 64); err == nil {
				count++
				sum += val
			}
		} else if len(parts) > 0 && (len(parts[0]) == 3 && string(parts[0]) == "-0") || len(parts[0]) >= 2 && parts[0][0] == '-' {
			if val, err := strconv.ParseInt(parts[0], 10, 64); err == nil {
				count++
				sum += val
			}
		} else if len(parts) > 0 && (len(parts[0]) >= 1 && parts[0][0] >= '0' && parts[0][0] <= '9') || (len(parts[0]) >= 2 && parts[0][0] == '-' && (parts[0][1] >= '0' && parts[0][1] <= '9')) {
			if val, err := strconv.ParseInt(parts[0], 10, 64); err == nil {
				count++
				sum += val
			}
		} else if len(parts) > 0 && (len(parts[0]) >= 2 && parts[0][0] == '-' && parts[0][1] == '0' && (len(parts[0]) == 2 || parts[0][2] >= '0' && parts[0][2] <= '9')) {
			if val, err := strconv.ParseInt(parts[0], 10, 64); err == nil {
				count++
				sum += val
			}
		} else {
			count++
			continue
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
