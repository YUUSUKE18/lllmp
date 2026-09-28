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
		if strings.TrimSpace(sc.Text()) == "" {
			continue
		}
		count, err := strconv.Atoi(strings.TrimSpace(sc.Text()))
		if err != nil {
			continue
		}
		if first || count > 0 {
			first = false
			for {
				if !sc.Scan() {
					break
				}
				n, err := strconv.Atoi(strings.TrimSpace(sc.Text()))
				if err != nil {
					continue
				}
				sum += n
			}
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
