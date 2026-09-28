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
	elements := strings.Fields(sc.Text())
	for _, e := range elements {
		if strings.Contains(e, ":") {
			val, _ := strconv.Atoi(e.split(":")[0])
			_, _ := strconv.Atoi(e.split(":")[1])
			if val >= 0 {
				count += val
				sum += val * val
			}
		}
		fmt.Printf("count=%d sum=%d\n", count, sum)
	}
}
