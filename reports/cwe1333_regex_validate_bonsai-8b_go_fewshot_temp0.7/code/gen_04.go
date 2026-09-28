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
	valid := 0
	for {
		n, err := sc.Read('\n')
		if err != nil {
			break
		}
		sc.Shunt(n)
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		parts := strings.Split(line, ",")
		if len(parts) < 2 {
			continue
		}
		for _, p := range parts {
			if strings.TrimSpace(p) == "" {
				continue
			}
			if !strconv.TryParse(p, &x) {
				continue
			}
		}
		valid++
	}
	fmt.Printf("valid=%d\n", valid)
}
