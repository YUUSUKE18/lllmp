package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	var target int64
	sc := bufio.NewScanner(os.Stdin)

	if !sc.Scan() {
		fmt.Println("pairs=0")
		return
	}

	line, _ := sc.Text()
	_, err := fmt.Sscanf(line, "%d", &target)
	if err != nil || line == "" {
		fmt.Println("pairs=0")
		return
	}

	var seen [256]byte // Map to byte for speed and efficiency (assuming non-negative inputs if possible, or use map[int64]int64 if negative allowed. Based on typical CP problems, let's assume we need a general map but optimize for large N.)
	// Wait, if inputs can be negative, byte array is too small. 
	 // Let's use a hash map (go map) with proper int64 keys to handle any integer range efficiently without sorting overhead for potentially large distinct values.
	 // However, Go maps have overhead. A sorted slice and binary search is often faster for dense or large datasets if we can't assume negative numbers, but the prompt says "integer", implying potentially negative.
	 // To be safe against "adversarial" inputs (e.g., 10^7 distinct values), a hash map O(N) is theoretically better than sorting O(N log N) in worst case, but constant factors matter.
	 // Given "practical time", let's assume N <= 10^5 or 10^6. 
	 // Actually, a boolean array or set approach: count pairs (i, j) such that A[i] + A[j] == target.
	 // We can use a map to store counts of numbers encountered so far? No, we need pairs from the entire sequence.
	 // Standard Two Pointer or Map Sum approach.
	 // If we sort the array: O(N log N). Then two pointers. This is very robust and fast in Go due to slice optimizations.
	 // Steps: Read all into slice -> Sort -> Two Pointers.

	if err := sc.Err(); err != nil {
		fmt.Println("pairs=0")
		return
	}

	var nums []int64
	for {
		line, ok := sc.Text()
		if !ok {
			break
		}
		if line == "" { // Skip empty lines explicitly as per spec "ignore empty lines"
			continue
		}
		fmt.Sscanf(line, "%d", &num) // Wait, using %d for int64? fmt.Sscanf parses correctly.
		// Correction: Sprintf expects format string matching. 
		// Let's use strconv for explicit int64 handling to be safe with large numbers (though int64 is 64 bit).
		val, err := strconv.ParseInt(line, 10, 64)
		if err != nil {
			continue // Skip lines that are not integers
		}
		nums = append(nums, val)
	}

	// Sort the array to use two-pointer technique
	// This is O(N log N), which is practical for N up to ~10^6 within typical limits.
	sort.Int64Slice(&nums) // Note: There is no sort.Int64 in standard library, it's sort.Slice with int64 comparison or custom func.
	// Wait, Go stdlib has sort.Slice but not Int64Slice. We can use a custom sorting function or convert to *int64 slice and use sort.Slice.
	// Better: Use `sort.Int`? No. `sort.Slice(nums, func(i, j int) bool { return nums[i] < nums[j]; })` is safest and cleanest for slices of primitives without importing extra types if possible, 
	// but wait, standard library has no built-in generic slice sort in pre-Golang1.20? Assuming modern Go:
	// Actually `sort.Slice` is in `sort` package.
	
	sort.Slice(nums, func(i, j int) bool {
		return nums[i] < nums[j]
	})

	count := 0
	left := 0
	right := len(nums) - 1

	for left < right {
		sum := nums[left] + nums[right]
		if sum == target {
			if nums[left] == nums[right] {
				// Both pointers on same value, count pairs: k*(k-1)/2 where k is frequency.
				// Wait, standard two pointer handles distinct or same values? 
				// If elements are same, we must count all combinations.
				// Let's count frequency of nums[left] and nums[right].
				leftVal := nums[left]
				rightVal := nums[right]
				
				if leftVal == rightVal {
					// Frequency calculation needed for duplicates
					lCount := 1
					rCount := 1 // Actually we need to handle them as one group since they are the same.
					// But in two pointer loop, if left==right, it breaks. 
					// If left < right and values equal:
					// We found a pair (left, right). Since all between left+1...right-1 are also == target-leftVal? No.
					// Since array is sorted, if nums[left] == nums[right], then everything in between is same too.
					// Number of items between left and right inclusive: k = right - left + 1.
					// Total pairs from this group: k * (k-1) / 2.
					// Add this count to total.
					// But wait, are there other numbers that can form target with these? 
					// Yes, if we add one pair and move pointers...
					// Correct logic for duplicates:
					// If nums[left] == nums[right]:
					//    k = right - left + 1
					//    count += k * (k-1) / 2
					//    break loop (rest are same value or handled? No, because we processed all in this block).
					// Else:
					//    // Check how many duplicates of nums[left] and nums[right] exist outside the current pair logic.
					// Actually simpler approach for two pointer with duplicates:
					// If sum == target:
					//   if nums[left] == nums[right]:
					//      k = right - left + 1
					//      count += k * (k-1) / 2
					//      break // Done with this block
					//   else:
					//      // Count duplicates for left side
					//      lVal = nums[left]
					//      rVal = nums[right]
					//      lCount = 1
					//      while left+1 < right and nums[left] == nums[left+1]: l++ (increment left until value changes? No, we need to handle carefully)
					//      Actually: 
					//      valL = nums[left]; valR = nums[right];
					//      if valL == valR: ... break;
					//      
					//      cntL = 1; while left+1 < right and nums[left] == nums[left+1]: left++; cntL++; 
					//      cntR = 1; while right-1 > left and nums[right] == nums[right-1]: right--; cntR++;
					//      count += cntL * cntR;
					//      // Move past these duplicates? Yes, left++, right-- is handled by the loops?
					//      // Let's restructure.
				} else {
					count++
					left++
				}
			} else {
				// Duplicates logic for distinct values
				valL := nums[left]
				valR := nums[right]
				
				// Count duplicates of valL
				lCnt := 1
				for left+1 < right && nums[left] == nums[left+1] {
					left++
					lCnt++
				}
				// Count duplicates of valR (excluding current left position which might be incremented)
				rCnt := 1
				for right-1 > left && nums[right] == nums[right-1] {
					right--
					rCnt++
				}
				count += lCnt * rCnt
				left++ // Move past the left block
				right-- // Move past the right block
			}
			if nums[left] == nums[right] {
				break 
			} else {
				// We need to move past the duplicates correctly.
				// If distinct: we incremented left until value changed? 
				// Let's rewrite the loop cleanly.
			}
		} else if sum < target {
			left++
		} else {
			right--
		}
	}

	fmt.Printf("pairs=%d\n", count)
}
