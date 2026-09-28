package main

import (
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
		if len(parts) == 2 {
			val, _ := strconv.Atoi(parts[0])
			cnt, _ := strconv.Atoi(parts[1])
			for i := 0; i < cnt; i++ {
				fmt.Fprintf(os.Stdout, fmt.Sprintf("%d ", val))
			}
		}
	}
	elements = strings.Join(strings.Fields(sc.Text()), ",")
	// Parse elements list (split by commas)
	parts := strings.Split(elements, ",")
	count := 0
	sum := 0
	for _, p := range parts {
		if len(p) == 0 {
			continue
		}
		partsP := strings.Split(p, ":")
		if len(partsP) == 2 {
			val, _ := strconv.Atoi(partsP[0])
			cnt, _ := strconv.Atoi(partsP[1])
			count += cnt
			sum += val * cnt
		}
	}
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
