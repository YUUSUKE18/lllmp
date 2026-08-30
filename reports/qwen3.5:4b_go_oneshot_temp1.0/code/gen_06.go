package main

import (
	"bufio"
	"fmt"
	"os"
	"sort"
	"strconv"
	"strings"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		return
	}
	input := sc.Text()
	pairs := make(map[int]int)

	fields := strings.Fields(input)
	for _, f := range fields {
		n, err := strconv.Atoi(f)
		if err != nil {
			continue
		}
		if val, exists := pairs[n]; !exists {
			pairs[n] = 1
		} else {
			pairs[n] = val + 1
		}
	}

	sort.Ints(sort.IntSlice(pairs))
	sum := int64(0)
	count := int64(0)
	for _, v := range pairs {
		s, ok := strconv.FormatInt(int64(v), 10)
		if !ok {
			continue
		}
		c := strings.Count(s, ",") + 1
		sum += int64(c) * v
		count++
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
}
