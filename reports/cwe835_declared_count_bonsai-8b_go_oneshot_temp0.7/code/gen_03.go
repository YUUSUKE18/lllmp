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
	first := true

	for {
		sc.Scan()
		if sc.Err() {
			if first {
				fmt.Println("count=<0> sum=<0>")
			} else {
				fmt.Println("count=<0> sum=<0>")
			}
			return
		}

		if first {
			count, err := strconv.Atoi(sc.Text())
			if err != nil {
				continue
			}
			first = false
		} else {
			sc.Scan()
			if sc.Err() {
				continue
			}
			n, err := strconv.Atoi(sc.Text())
			if err != nil {
				continue
			}
			count++
			sum += n
		}
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
