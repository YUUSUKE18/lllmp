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
	countStr, _ := readLine(sc)
	count, _ := strconv.Atoi(countStr)

	var sum int
	first := true
	for {
		line, _ := readLine(sc)
		if line == "" {
			break
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if first || n > sum {
			sum = n
			first = false
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}

func readLine(scanner *bufio.Scanner) string {
	if !scanner.Scan() {
		return ""
	}
	return scanner.Text()
}
