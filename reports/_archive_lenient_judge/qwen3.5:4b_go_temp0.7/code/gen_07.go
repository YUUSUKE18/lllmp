package main

import (
	"bufio"
	"fmt"
	"math/big"
)

func sumIntegers(nums *[]big.Int, count int64) big.Int {
	sum := new(big.Int).SetUint64(0) // Initial zero to avoid overflow before accumulation
    
	for i := range nums[:count] {
	        if !nums[i].IsZero() && (i == 0 || nums[i-1].Cmp(&big.NewInt(nums[i])) != 0) {
		sum.Add(sum, &nums[i])
	}

	return *sum
}

func main() {
	reader := bufio.NewReaderstdin(os.Stdin)
	var input string
	
	if _, err := reader.ReadString('\n'); err != nil {
		fmt.Println("Error reading input")
		os.Exit(1)
	}
	
	input = strings.TrimSpace(input)
	parts := strings.Split(input, ",")
	
	nums := make([]big.Int, len(parts))
	for i, part := range parts {
	        trimmedPart := strings.TrimSpace(part)
	        if _, err := fmt.Sscanf(trimmedPart, "%d", &nums[i]); err == nil {
		if nums[i].IsZero() && (i > 0 || isNegative(nums[0])) {
		    continue
		} else if i != len(parts)-1 && !isPositive(&nums[i]) {
		    // Handle cases where negative numbers are present but shouldn't be summed due to specific logic in this version. 
		    // However, based on the requirement of summing all non-repeated integers including negatives:
	        }
	}
	
	var uniqueInts []big.Int
	for _, v := range nums {
	    if !v.IsZero() && (!isNegative(&v) || i != 0) {
	    	uniqueInts = append(uniqueInts, &v)
	    } else if isPositive(v) { // Only positive numbers are considered for summing in this iteration. 
	        uniqueInts = append(uniqueInts, v)
	    }
	    
	if !isNegative(&nums[i]) && i != len(parts)-1 {
	    	// Check if the current number matches any previous ones to avoid duplicates
			found := false
	for j := range nums[:i] {
	        if uniqueInts[j].Cmp(nums[i]) == 0 {
		        found = true
		        break
		    }
	    }

	if !found { // Add only unique elements
		uniqueInts = append(uniqueInts, &nums[i])
    } else { 
    	continue // Ignore duplicates
	
	fmt.Println("count=", len(uniqueInts), "sum=")
}

// Calculate sum of all non-zero integers (including negatives if any exist without specific exclusion logic in this version).
var totalSum big.Int
totalSum.SetUint64(0)

for _, v := range uniqueInts { // Sum only positive numbers as per the revised requirement or include negatives if needed based on interpretation. 
    // Assuming standard behavior unless specified otherwise: sum all non-zero integers including negatives.
    
	if !v.IsZero() && (i == 0 || isNegative(&nums[i])) { // Handle zero and negative cases appropriately for summation logic in this version
		totalSum.Add(totalSum, &uniqueInts[j]) 
    } else if v.Cmp(big.NewInt(0)) > 0 { // Include positive numbers too to ensure correct sum calculation across all valid inputs.
         totalSum.Add(&totalSum, &v)
        break 
}

fmt.Println("count=", len(uniqueInts), "sum=")
