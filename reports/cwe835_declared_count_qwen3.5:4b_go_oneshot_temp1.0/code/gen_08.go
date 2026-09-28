package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var count int
	sum := int64(0)
	sc.Scan()
	line1, _ := sc.Text()
	countInt, err := strconv.Atoi(line1)
	if err != nil {
		fmt.Printf("count=0 sum=0\n")
		return
	}

	countActual := 0
	for sc.Scan() {
		line, _ := sc.Text()
		fields := strings.Fields(line)
		for _, f := range fields {
			n, err := strconv.Atoi(f)
			if err != nil {
				continue
			}
			sum += int64(n)
			countActual++
		}
	}

	fmt.Printf("count=%d sum=%d\n", countActual, sum)
}
