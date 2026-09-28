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
	var count, sum int
	for {
		n, err := strconv.Atoi(sc.Text().Split(":", 1)[1])
		if err != nil {
			if n == 0 {
				continue
			}
			break
		}
		sc.Scan()
		if n > 0 {
			count++
			sum += n
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
