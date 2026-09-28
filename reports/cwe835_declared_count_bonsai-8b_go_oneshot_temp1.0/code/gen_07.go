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
	countStr, _ := readInteger(sc)
	count := strconv.Atoi(countStr)
	sum := 0
	first := true

	for {
		sc.Scan()
		if !sc.Err() && !sc.Done() {
			if first {
				first = false
				continue
			}
			n, err := strconv.Atoi(sc.Text())
			if err != nil {
				continue
			}
			sum += n
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}

func readInteger(sc *bufio.Scanner) string {
	var line string
	sc.Scan()
	line = strings.TrimSpace(sc.Text())
	if len(line) == 0 {
		return ""
	}
	return line
}
