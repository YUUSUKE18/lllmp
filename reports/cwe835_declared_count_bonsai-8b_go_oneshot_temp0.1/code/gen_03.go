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

	var countActual int
	var sum Actual int

	for {
		line, _ := readLine(sc)
		if line == "" {
			break
		}
		parts := strings.Fields(line)
		for _, part := range parts {
			n, err := strconv.Atoi(part)
			if err != nil {
				continue
			}
			countActual++
			sum += n
		}
	}

	fmt.Printf("count=%d sum=%d\n", countActual, sum)
}

func readLine(scanner *bufio.Scanner) string {
	if !scanner.Scan() {
		return ""
	}
	return scanner.Text()
}
