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
	for _, line := range strings.Fields(sc.Text()) {
		if first {
			_, err := strconv.Atoi(line)
			if err != nil {
				continue
			}
			target = line
		} else {
			n, err := strconv.Atoi(line)
			if err != nil {
				continue
			}
			if n == target {
				pairs++
			}
		}
	}
	fmt.Printf("pairs=%d\n", pairs)
}
