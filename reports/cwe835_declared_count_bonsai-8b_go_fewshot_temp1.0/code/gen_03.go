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
	max := 0
	first := true
	count := 0
	sum := 0
	for {
		n, err := sc.ReadBytes(64 * 1024)
		if err != nil {
			if err == io.EOF {
				break
			}
			break
		}
		if n == 0 {
			break
		}
		line := string(n)
		if strings.TrimSpace(line) == "" {
			continue
		}
		n, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		if first || n > max {
			max = n
			first = false
		}
		count++
		sum += n
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
