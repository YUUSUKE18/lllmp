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
		n, err := strconv.Atoi(sc.Text().Split(",")[0])
		if err != nil {
			break
		}
		if n <= 0 {
			continue
		}
		_, err := strconv.Atoi(sc.Text().Split(",")[1])
		if err != nil {
			continue
		}
		sum += n
		count += 1
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
