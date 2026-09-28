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
	c := 0
	max := 0
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if n != 0 {
			c++
			if n > max {
				max = n
			}
		}
	}
	fmt.Printf("count=%d max=%d\n", c, max)
}
