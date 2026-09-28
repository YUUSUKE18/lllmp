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
	var count, sum int
	for {
		n, err := strconv.Atoi(sc.Text())
		if err != nil {
			break
		}
		if strings.TrimSpace(sc.Text()) == "" {
			continue
		}
		split := strings.Split(sc.Text(), ":")
		if len(split) != 2 {
			continue
		}
		_, v := split
		if v == "" {
			continue
		}
		_, numStr := v
		num, _ := strconv.Atoi(numStr)
		if num < 0 {
			continue
		}
		for i := 0; i < num; i++ {
			count++
			sum += n
		}
		if err != nil {
			break
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
