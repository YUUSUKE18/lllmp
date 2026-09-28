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
	if err != nil {
		fmt.Println("count=<0> sum=<0>")
		return
	}
	count = strconv.Atoi(sc.Text())
	sc.Scan()
	for { ; } {
		sc.Scan()
		if err != nil {
			break
		}
		var n string
		sc.Scan(&n)
		if err != nil {
			break
		}
		if len(n) == 0 {
			continue
		}
		n, err := strconv.Atoi(n)
		if err != nil {
			continue
		}
		if count > 0 && n > 0 {
			sum += n
			count--
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
