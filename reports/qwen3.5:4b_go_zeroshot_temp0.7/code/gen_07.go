package main

import (
	"bufio"
	"fmt"
	"math/big"
	"strconv"
)

func main() {
	reader := bufio.NewReaderStdin()
	var input string
	if _, err := fmt.Fscanf(reader, "%[^\n]", &input); err != nil {
		return
	}

	var distinctMap = make(map[int]int64)

	for _, s := range []byte(input) {
		if s == ',' || s == ' ' {
			continue
		}
		num, err := strconv.ParseInt(string(string(s)), 10, 64)
		if err != nil {
			continue
		}
		distinctMap[num]++
	}

	var totalSum big.Int
	totalSum.SetInt64(0)

	for _, count := range distinctMap {
		sumBig, ok := new(big.Int).SetInt64(int64(count)) // 個数
		sumBig.Mul(sumBig, sumBig) // 個数 * 個数? No. Correct logic:
		// Wait, I misread the requirement. 
		// "それぞれ" (each of them) -> "重複を除いた整数"について、個数と合計を求めます。
		// Does it mean: For EACH unique integer found in the input list, print its count and sum?
		// Or: Take all unique integers, find the COUNT of unique integers, and their SUM?
		// Let's re-read carefully.
		// "それらのうち『重複を除いた整数』について、個数と合計を求めます。"
		// Translation: Among them (the input numbers), regarding the 'unique integers' (plural set), find the count and total sum.
		// Usually, this phrasing implies we take the SET of unique numbers.
		// Then we calculate: 
		// 1. Count of unique numbers (how many distinct numbers are there?)
		// 2. Sum of those unique numbers (add them all up).
		// The phrase "個数" likely refers to the count of the unique elements, not the frequency of each element.
		// And "合計" refers to the sum of those unique elements.
		// If it meant frequency, it would usually say "各整数について".
		// Let's assume the set interpretation: 
		// Count = number of distinct integers present in input.
		// Sum = sum of all distinct integers present in input.

		// Re-evaluating based on standard coding problem patterns:
		// Input: 1, 2, 2, 3
		// Unique: {1, 2, 3}
		// Count (of unique items): 3
		// Sum (of unique items): 1+2+3 = 6
		// Output: count=3 sum=6

		// Wait, the loop above `distinctMap[num]++` is wrong for this logic.
		// If I want just the set of unique numbers, I should just track existence.
		// Let's restart the parsing logic to be clean.
	}

	// Reset and do it correctly
	distinctSet := make(map[int]bool)
	
	// Read input again? No, I can't re-read stdin easily without buffering or reopening.
	// Since Go is single execution per process, I'll re-implement the logic cleanly in a single pass now that I know the requirement.
	// Actually, let's fix the first loop variable usage.
	
	// Correct Logic:
	// 1. Parse all integers from input.
	// 2. Store unique integers in a set (map[int]bool).
	// 3. Calculate count = len(set).
	// 4. Calculate sum = sum of keys in set.
	
	// I need to re-parse the string `input` which was already read into a variable.
	
	count := 0
	sumBig := big.NewInt(0)

	for _, char := range input {
		if char == ',' || char == ' ' {
			continue
		}
		
		numStr := strconv.FormatInt(int64(char), 10) // Wait, char is not enough. I need the full number string.
		// The previous loop was trying to parse one by one char which is wrong for multi-digit numbers.
		// Let's just use strings.Split with comma and whitespace handling properly or regex? 
		// Or simple manual parsing since we have the raw string `input`.
		
		// Better approach: split by non-digits/non-comma? No, input might be "100, 200".
		// Let's use a simpler state machine on `input` or just regex replace.
	}
	
	// Since I cannot restart the loop on `input` variable without re-declaring it (which is fine in Go main),
	// let's rewrite the parsing part cleanly inside the function logic now.
	
	// Parse integers from input string
	var nums []int64
	for _, char := range input {
		if char >= '0' && char <= '9' {
			nums = append(nums, int64(char)) // Wait, this is wrong again.
		}
	}
	
	// Okay, let's write a proper parser function.
	
	var uniqueNums map[int]bool = make(map[int]bool)
	var sumBig big.Int
	
	for _, r := range input {
		if (r >= '0' && r <= '9') {
			continue // We need to accumulate digits? Or use strconv.ParseInt on chunks?
		}
	}
	
	// Let's restart the whole flow correctly.
	// The previous attempt was flawed because I tried to parse digit-by-digit.
	// Correct way: Iterate through string, build numbers, or use strings.Split with a custom delimiter logic.
	// Simplest: Replace all non-digit/minus signs? No, input is comma separated integers.
	// "1, 2, -3" -> split by [,\s]+
	
	// Since I can't do `strings.FieldsFunc` easily without import (I imported math/big and bufio), 
	// let's use a manual split loop.
	
	var tokens []int64
	
	currentNum := ""
	for _, r := range input {
		if r == ',' || r == ' ' || r == '\t' {
			if currentNum != "" {
				num, err := strconv.ParseInt(currentNum, 10, 64)
				if err == nil {
					tokens = append(tokens, num)
				}
				currentNum = ""
			}
		} else if (r >= '0' && r <= '9') || r == '-' {
			currentNum += string(r)
		}
	}
	
	if currentNum != "" {
		num, err := strconv.ParseInt(currentNum, 10, 64)
		if err == nil {
			tokens = append(tokens, num)
		}
	}
	
	// Now process tokens to find unique ones
	distinctSet := make(map[int]bool)
	
	for _, t := range tokens {
		distinctSet[t] = true
	}
	
	count := len(distinctSet)
	sumBig.SetInt64(0)
	
	for val := range distinctSet {
		sumBig.Add(sumBig, big.NewInt(val))
	}
	
	fmt.Printf("count=%d sum=%s\n", count, sumBig.String())
