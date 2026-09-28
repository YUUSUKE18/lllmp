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
	target := 0
	first := true
	pairs := 0
	for _, s := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(s)
		if err != nil {
			continue
		}
		if first || n > target {
			target = n
			first = false
		} else {
			if first || n + target > 0 {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
