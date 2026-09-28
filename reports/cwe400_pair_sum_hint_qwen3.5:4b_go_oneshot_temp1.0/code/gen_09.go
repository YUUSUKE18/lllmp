package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	var sum int64
	twoSumTarget := int64(0)

	if !sc.Scan() {
		os.Exit(1)
	}
	line, _ := sc.ReadLine()
	if line != "" && line[0] == '\t' {
		if len(line) > 1 {
			line = line[1:]
		}
	} else {
		sum += parseInt64(line)
	}

	for sc.Scan() {
		line, _ := sc.ReadLine()
		val, err := parseInt64(line)
		if err != nil || val == 0 || sum < 0 {
			continue
		}
		twoSumTarget -= val
		countPairs(int64(0), &sum, &twoSumTarget)
	}

	fmt.Printf("pairs=%d\n", int(countPairs(int64(0), &sum, &twoSumTarget)))
}

func countPairs(current int64, sum *int64, target *int64) {
	if current < 0 || *sum == 0 || *target > *sum {
		return
	}
	sum += current
	target -= current
	count := int64(0)
	if sum <= 0 {
		count = count + countPairs(current+sum, sum, target)
	}
	*sum = -count
	*target = current * sum
}

func parseInt64(s string) (int64, error) {
	var n int64
	_, err := fmt.Sscanf("%d", &n)
	if err != nil || s == "" || s[0] == '\t' {
		return 0, nil
	}
	if len(s) > 1 && s[0] == '-' {
		n = -n
	}
	return n, nil
}
