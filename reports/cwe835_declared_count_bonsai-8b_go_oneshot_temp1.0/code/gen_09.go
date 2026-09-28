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
	var sum int64
	first := true
	for {
		if !sc.Text() {
			break
		}
		sc.Scan()
		if first {
			count, _ = strconv.Atoi(sc.Text())
			first = false
		} else {
			line := strings.Fields(sc.Text())
			for _, numStr := range line {
				n, err := strconv.Atoi(numStr)
				if err != nil {
					continue
				}
				sum += n
			}
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
