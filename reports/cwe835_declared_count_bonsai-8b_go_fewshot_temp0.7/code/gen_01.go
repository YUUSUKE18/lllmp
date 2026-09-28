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
	count := 0
	sum := 0
	for {
		n, err := sc.Read([]byte(64 * 1024))
		if err != nil {
			break
		}
		if n == 0 {
			continue
		}
		if strings.TrimSpace(sc.Text()) != "" {
			count, _ = strconv.Atoi(sc.Text())
		}
		if err := strconv.Atoi(string(sc.Text())); err == nil {
			sum += n
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
