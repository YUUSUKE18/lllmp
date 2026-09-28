package main

import (
	"bufio"
	"fmt"
	"math/big"
)

func main() {
	reader := bufio.NewReaderStdin()
	line, _ := reader.ReadString('\n')
	
	var integers []*big.Int
	
	for _, token := range scanner(line) {
		integer, ok := new(big.Int).SetString(token, 10)
		if !ok {
			continue
		}
		
		switch integer.Sign() {
		case -1:
			continue
		
		default:
			break
		}
		
		counts[int(integer)]++
		sum.Add(sum, new(big.Int).Set(integer))
	}
	
	fmt.Printf("count=%d sum=%s\n", counts[len(counts)], string(sum.String()))
}

func scanner(line string) []string {
	var tokens []string
	start := 0
	
	for i := range line {
		if (line[i] >= '0' && line[i] <= '9') || (i == 1 && line[2]) >= 'a' && line[i] <= 'z') {
			tokens = append(tokens, string(line[start:i]))
		} else if i > start && len(tokens) > 0 {
			if (line[i-1] < 'A' || line[i-1] > 'Z') && (line[i-2] >= 'a' && line[i-2] <= 'z') || 
			   ((i==start+3 && i>start) && len(tokens)>=4){break;}}
		start++
	
	return tokens
}

var counts = map[*big.Int]int{}
var sum *big.Int
func (c *countsMap) Set(i int, v big.Int) {
	c[i] += v
	sum.Add(sum, &v)
}
