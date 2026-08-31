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
	var first bool
	count := 0
	sum := int64(0)
	
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if line == "" {
			continue
		}
		
		idx := strings.Index(line, ":")
		nums := strings.FieldsFunc(line, func(r rune) bool {
			return r == ' ' || r == '\n' || r == '\t' || r == '\r'
		})
		
		if idx > 0 {
			parts := strings.Split(line, ":")
			countStr := strings.TrimSpace(parts[0])
			sumInt, _ := strconv.Atoi(countStr)
			count = sumInt
            
			for _, w := range nums {
				if n, err := strconv.ParseInt(w, 10, 64); err == nil {
					sum += n
					count++
				}
			}
		}
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
