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

	sum := 0
	first := true
	for _, line := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if first || n > count {
			sum += n
			first = false
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}

func readLine(sc *bufio.Scanner) string {
	var line strings.Builder
	for {
		n, err := sc.ReadLn()
		if err == io.EOF {
			return line.String()
		}
		if err != nil {
			return ""
		}
		line.WriteString(n)
	}
}
