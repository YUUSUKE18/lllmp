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
		var num int
		sc.Scan()
		_, err = strconv.Atoi(num)
		if err != nil {
			continue
		}
		count++
		sum += num
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
