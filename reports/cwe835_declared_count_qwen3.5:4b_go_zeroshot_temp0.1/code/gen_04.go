package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	reader := bufio.NewReader(os.Stdin)
	
	var count int
	var sum int64
	
	line, err := reader.ReadString('\n')
	if err != nil {
		return
	}
	
	countStr := ""
	for i := 0; i < len(line); i++ {
		if line[i] == ' ' || line[i] == '\t' {
			continue
		}
		countStr += string(line[i])
	}
	
	if countStr != "" {
		variableCount, err := strconv.Atoi(countStr)
		if err != nil {
			return
		}
		count = variableCount
	}
	
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			break
		}
		
		if line == "" {
			continue
		}
		
		variables := []int{}
		for i := 0; i < len(line); i++ {
			if line[i] == ' ' || line[i] == '\t' {
				continue
			}
			variables = append(variables, line[i])
		}
		
		for _, v := range variables {
			num, err := strconv.Atoi(string(v))
			if err != nil {
				continue
			}
			
			sum += int64(num)
			count++
		}
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
