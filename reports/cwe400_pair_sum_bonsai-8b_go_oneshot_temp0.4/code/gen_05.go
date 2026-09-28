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
	}
	for i := 0; i < len(strings.Fields(sc.Text())); i++ {
		n, err := strconv.Atoi(strings.Fields(sc.Text())[i])
		if err != nil {
			continue
		}
		if n > target {
			continue
		}
		if i > 0 && strings.Fields(sc.Text())[i-1] != "" && strconv.Atoi(strings.Fields(sc.Text())[i-1]) < target {
			pairs++
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
