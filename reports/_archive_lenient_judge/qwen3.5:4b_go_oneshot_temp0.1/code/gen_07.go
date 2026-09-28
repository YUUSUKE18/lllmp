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

	input := sc.Text()
	parts := strings.Split(input, ",")
	counts := make(map[int]int64) // 重複を除いた整数の個数と合計を保持するマップ (key: integer, value: count+sum pair? No, need separate logic or struct. Let's use a map for counts and sum separately to avoid confusion in the loop).

	// Actually, let's re-read requirement carefully: "重複を除いた整数について、個数と合計を求めます"
	// This phrasing is slightly ambiguous. Does it mean:
	// A) For each unique integer X appearing N times, output count=N and sum=X*N? (Total Sum of all occurrences?)
	// B) Or does "重複を除いた整数" imply we only consider the set of unique numbers once? 
	// Given standard competitive programming patterns for such problems:
	// Usually it means: Count how many times each number appears, AND calculate the sum of those specific counts.
	// OR more likely based on typical problem sets (like AtCoder/Codeforces):
	// "For the unique integers found in input": 
	//   - Calculate frequency count for each integer? No, that would be multiple lines or a map output.
	// The example format `count=<int> sum=<int>` suggests TWO numbers total per line.
	// Interpretation 1: Total number of distinct elements (unique integers) found in the input list is C, and their SUM is S? 
	//   - "重複を除いた整数" -> Unique integers.
	//   - "個数と合計": Count = Number of unique integers? Sum = Sum of those unique integers?
	// Interpretation 2: For each integer in the input (ignoring duplicates for counting?), no that doesn't make sense with a single line output.
	// Let's look at similar problems. Often "count" refers to total count of items, but here it says "for duplicate-removed integers".
	// Most logical interpretation given `count=<int> sum=<int>`:
	// 1. Identify all unique integers present in the input (e.g., if input is "1,2,3", uniques are {1,2,3}).
	// 2. Count = size of this set? Or count of occurrences per number summed up? 
	//    If I have "1,1,2", unique integers are {1, 2}. Count could be 2 (number of unique types). Sum could be 1+2=3.
	//    OR: Maybe it means sum the counts and sum the values? No, that's redundant if count is total items.
	// Let's assume the standard interpretation for "unique elements":
	// Count = Number of distinct integers found in the input sequence.
	// Sum = Arithmetic sum of those distinct integers.
	
	// Wait, re-reading: "それらのうち『重複を除いた整数』について、個数と合計を求めます"
	// Subject: The unique integers (after removing duplicates).
	// Task 1: Find the count (of these unique integers?). -> Number of distinct elements.
	// Task 2: Find the sum (of these unique integers?). -> Sum of their values.
	
	// Example trace: Input "1,2,3" -> Unique {1,2,3}. Count=3, Sum=6. Output count=3 sum=6.
	// Example trace: Input "1,1,2" -> Unique {1,2}. Count=2, Sum=3. Output count=2 sum=3.
	
	uniqueSet := make(map[int]bool) // Use bool to mark presence of unique integers
	
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if len(part) == 0 {
			continue
		}
		
		val, err := strconv.Atoi(part)
		if err != nil {
			continue
		}
		
		uniqueSet[val] = true // Mark as seen (duplicate removal logic handled by map key uniqueness)
	}
	
	count := len(uniqueSet)
	sum := 0
	
	for v := range uniqueSet {
		sum += int64(v)
	}
	
	fmt.Printf("count=%d sum=%d\n", count, sum)
}
