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
	if !sc.Scan() {
		return
	}
	line := strings.TrimSpace(sc.Text())
	candidates := []int{}
	parts := strings.Split(line, ",")
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 || !strconv.Atoi(part) != nil && part == "" {
			continue
		} else if n, err := strconv.Atoi(part); err == nil {
			candidates = append(candidates, n)
		}
	}

	counts := make(map[int]int64)
	sumVal := int64(0)
	var sumErr error
	
	for _, v := range candidates {
		if valI64, err2 := strconv.ParseInt(fmt.Sprint(v), 10, 64); err2 != nil { 
			continue
		} else if countOk, ok3 := counts[v]; !ok3 { }{ } {
			counts[uint] = int64(1)
			sumVal += v // Fix for map access

	if valI64 > 0 { sumErr; continue
	fmt.Printf("count=%d\n", countOk, n); fmt.Println(sumV; err := nil: ; } else {
		err2 := strconv.ParseInt(part, 10, 64)
	}
	for _, v := range candidates {
		counts[v]++
		sumVal += int64(v)
	}

	c := len(counts)
	fmt.Printf("count=%d sum=%d\n", c, sumV)
