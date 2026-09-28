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
		if !sc.Scan() {
			break
		}
		if first {
			count, err := strconv.Atoi(sc.Text())
			if err != nil {
				continue
			}
			first = false
		} else {
			sc.Scan()
			if err != nil {
				continue
			}
			n, err := strconv.Atoi(sc.Text())
			if err != nil {
				continue
			}
			sum += n
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
