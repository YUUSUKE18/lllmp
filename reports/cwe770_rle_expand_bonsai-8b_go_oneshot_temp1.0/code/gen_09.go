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
	var count = 0
	var sum = 0
	for _, s := range strings.Fields(sc.Text()) {
		if strings.HasPrefix(s, "value:") {
			s = strings.ReplaceN(s, "value:", "", 1)
			if s == "" {
				continue
			}
			val, err := strconv.Atoi(s)
			if err != nil {
				continue
			}
			parts := strings.SplitN(s, ":", 2)
			if len(parts) < 2 {
				continue
			}
			_, err = strconv.Atoi(parts[1])
			if err != nil {
				continue
			}
			if val == 0 {
				continue
			}
			count += val
			sum += val * val
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
