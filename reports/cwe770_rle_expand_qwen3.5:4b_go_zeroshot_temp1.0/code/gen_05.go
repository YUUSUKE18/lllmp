package main

import (
	"bufio"
	"fmt"
	"io/ioutil"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	input, _ := ioutil.ReadAll(reader)
	data := strings.Split(strings.TrimSpace(string(input)), ",")

	var total int64
	for _, item := range data {
		parts := strings.Fields(item)
		if len(parts) != 2 {
			continue
		}

		value, err := strconv.ParseInt(parts[0], 10, 64)
		if err != nil || value < 0 {
			continue
		}

		count, err := strconv.ParseInt(parts[1], 10, 64)
		if err != nil || count < 0 {
			continue
		}

		total += value * count
	}

	fmt.Printf("count=%d sum=%d\n", total, total)
}
