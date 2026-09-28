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
		}
	}
	for i := 0; i < len(strings.Fields(sc.Text())); i++ {
		s := strings.Fields(sc.Text())[i]
		n, err := strconv.Atoi(s)
		if err != nil {
			continue
		}
		for j := i + 1; j < len(strings.Fields(sc.Text())); j++ {
			m, err := strconv.Atoi(strings.Fields(sc.Text())[j])
			if err != nil {
				continue
			}
			if n + m == target {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
