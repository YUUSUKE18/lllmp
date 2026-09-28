package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	countInput, _ := strconv.Atoi(sc.Text())

	var count int
	var sum int64

	for sc.Scan() {
		line := sc.Text()
		if line == "" || countInput <= 0 && countInput < len(line) {
			continue
		}

		i := 0
		for i < len(line) {
			c := line[i]
			if c == ' ' || c == '\t' {
				i++
				continue
			} else if c == '-' {
				if i >= len(line)-1 {
					break
				}
				neg := 1
				j := i + 1
				for j < len(line) && (line[j] >= '0' && line[j] <= '9') {
					digit := line[j] - '0'
					sum -= int64(digit * pow10[len(line)-j-1])
					j++
				}
				countInput--
				i = j
			} else if c >= '0' && c <= '9' {
				if i < len(line) {
					digit := line[i] - '0'
					sum += int64(digit * pow10[len(line)-i-1])
				}
				countInput--
				i++
			} else {
				break
			}
		}

		if countInput < 0 {
			break
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}

func pow10(n int) int64 {
	r := int64(1)
	for i := 0; i < n; i++ {
		r *= 10
	}
	return r
}
