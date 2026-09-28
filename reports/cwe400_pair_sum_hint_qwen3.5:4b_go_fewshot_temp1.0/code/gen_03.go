package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	reader := bufio.NewReader(os.Stdin)
	
	target, targetStripped := 0, true
	if !scanner.Scan() || scanner.Text() == "" {
		fmt.Println("pairs=0")
		return
	}
	
	target, err := strconv.Atoi(scanner.Text())
	if err != nil {
		fmt.Println("pairs=0")
		return
	}

	var numbers []int64
	numbersRead := 0
	scanner.Scan()
	
	for scanner.Scan() {
		line := scanner.Text()
		
		if line == "" {
			continue
		}
		
		val, err := strconv.Atoi(line)
		if err != nil {
			continue
		}
		
		numbers = append(numbers, int64(val))
		numbersRead++
	}

	if len(numbers) < 2 {
		fmt.Println("pairs=0")
		return
	}

	pairs := 0
	complement := target
	
	countMap := make(map[int64]int)
	
	for _, num := range numbers {
		diff := complement - num
		
		count, exists := countMap[diff]
		if exists {
			pairs += count
		}
		
		countMap[num] = countMap[num] + 1
	}

	fmt.Printf("pairs=%d\n", pairs)
}
