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
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if first || n > target {
			target = n
			first = false
		}
		if first {
			continue
		}
		if n == target {
			pairs++
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
