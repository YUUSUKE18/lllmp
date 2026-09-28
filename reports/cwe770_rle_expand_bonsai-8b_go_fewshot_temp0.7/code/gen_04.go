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
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			break
		}
		sc.Scan()
		if n <= 0 {
			continue
		}
		count += n
		sum += n * n
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
