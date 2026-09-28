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
		parts := strings.SplitN(s, ":")
		if len(parts) != 2 {
			continue
		}
		val, err := strconv.Atoi(parts[0])
		if err != nil {
			continue
		}
		_, err = strconv.Atoi(parts[1])
		if err != nil {
			continue
		}
		count += 1
		sum += val
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
