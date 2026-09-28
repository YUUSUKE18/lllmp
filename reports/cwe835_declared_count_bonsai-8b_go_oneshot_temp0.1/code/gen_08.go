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

	sc.Scan()
	for {
		line, _ := readLine(sc)
		if line == "" {
			break
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if n > 0 && n <= count && countActual < count {
			countActual++
			sum += n
		}
	}

	fmt.Printf("count=%d sum=%d\n", countActual, sum)
}

func readLine(scanner *bufio.Scanner) string {
	if scanner.Done() {
		return ""
	}
	return scanner.Text()
}
