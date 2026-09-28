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
	var count, sum int
	sc.Scan()
	count = 0
	for {
		sc.Scan()
		if !sc.Err() && !sc.Done() {
			break
		}
		line := strings.TrimSpace(sc.Text())
		if count > 0 && strings.Fields(line) != nil {
			n, err := strconv.Atoi(line)
			if err != nil {
				continue
			}
			count++
			sum += n
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
