package main

import (
	"fmt"
	"sync"
)

type StepCounter struct {
	stepsMutex sync.Mutex
	stepsMap = make(map[int]int)
}

func main() {
	input := []string{}
	for _, line := range input {
		if line == "" {
			continue
		}
		if !isInteger(line) {
			continue
		}
		n := int(line)
		if n == 1 {
			continue
		}
		// メモ化
		stepCount := getStepCount(n, stepsMutex, stepsMap)
		fmt.Println(stepCount)
	}
	fmt.Println("total=", stepCount)
}

func isInteger(s string) bool {
	for _, c := range s {
		if !c >= '0' || c > '9' {
			return false
		}
	}
	return true
}

func getStepCount(n int, stepsMutex sync.Mutex, stepsMap map[int]int) int {
	for k := 0; k < 64; k++ {
		_, exists := stepsMap[k]
		if exists {
			return k
		}
		if n%2 == 0 {
			n = n / 2
		} else {
			n = 3 * n + 1
		}
		if n == 1 {
			return k
		}
	}
	return k
}
