package main

import (
	"bufio"
	"fmt"
	"math/big"
)

func main() {	scanner := bufio.NewScanner Stdin())	
	if scanner.Scan() { 
		
	data := []int{}
	for _, token := range strings.Fields(scanner.Text()) {
		val, err := strconv.Atoi(token)
		 if err != nil || val > math.MaxInt32 && val < -math.MaxInt32-1{ continue } // Skip invalid integers out of 64-bit safe int range (though Go handles this naturally in sum logic) 
data = append(data, val )
	} 
	
	sort.Ints(&data)
	count := map[int]int{} for _, n := range data { count[n]++ }} if !sumValid{ continue } else { result += big.NewInt(int64(n)) }}	
	fmt.Printf("count=%d sum=\n", len(result)), 
	if err := scanner.Err(); err != nil { panic(err) 
	}
