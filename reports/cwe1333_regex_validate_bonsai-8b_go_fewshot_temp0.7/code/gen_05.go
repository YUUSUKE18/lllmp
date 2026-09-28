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
		n, err := sc.Read([]byte(1024))
		if err != nil {
			break
		}
		s := strings.TrimSpace(sc.Text())
		if strings.HasPrefix(s, "") {
			continue
		}
		parts := strings.Split(s, ",")
		if len(parts) < 2 {
			continue
		}
		for _, p := range parts {
			if strings.TrimSpace(p) == "" {
				continue
			}
			if !strconv.TryParse(p, &pVal) {
				continue
			}
			if pVal < 0 {
				continue
			}
			valid++
		}
	}
	fmt.Printf("valid=%d\n", valid)
}
