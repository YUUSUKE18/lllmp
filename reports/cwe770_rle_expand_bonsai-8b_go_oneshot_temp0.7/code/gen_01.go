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
	var elements []string
	for _, s := range strings.Fields(sc.Text()) {
		parts := strings.SplitN(s, ":")
		if len(parts) != 2 {
			continue
		}
		val, _ := strconv.Atoi(parts[0])
		cnt, _ := strconv.Atoi(parts[1])
		if cnt < 0 {
			continue
		}
		elements = append(elements, fmt.Sprintf("%d:%d", val, cnt))
	}
	count := 0
	sum := 0
	for _, e := range elements {
		parts := strings.Split(e, ":")
		if len(parts) != 2 {
			continue
		}
		val, _ := strconv.Atoi(parts[0])
		cnt, _ := strconv.Atoi(parts[1])
		if cnt < 0 {
			continue
		}
		count += cnt
		sum += val * cnt
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
