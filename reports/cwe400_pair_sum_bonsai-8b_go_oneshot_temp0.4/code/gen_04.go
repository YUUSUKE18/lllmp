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
		if first {
			first = false
			continue
		}
		n, err := strconv.Atoi(s)
		if err != nil {
			continue
		}
		if n == target {
			pairs++
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
