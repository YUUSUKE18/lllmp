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
	var sumActual int

	for {
		line, _ := readLine(sc)
		if line == "" {
			break
		}
		// 整数を分割する
		parts := strings.Fields(line)
		for _, part := range parts {
			n, err := strconv.Atoi(part)
			if err != nil {
				continue
			}
			countActual++
			sumActual += n
		}
	}

	fmt.Printf("count=%d sum=%d\n", countActual, sumActual)
}

func readLine(scanner *bufio.Scanner) string {
	if !scanner.Scan() {
		return ""
	}
	return scanner.Text()
}
