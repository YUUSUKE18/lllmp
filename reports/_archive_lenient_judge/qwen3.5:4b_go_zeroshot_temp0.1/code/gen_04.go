package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately, but we need to handle input properly. 
	// Actually, for standard input in Go without arguments, we should use os.Stdin or similar logic if needed.
	// However, the spec says "standard input". Let's assume it might be empty or have content.
	// Since bufio.NewReader(nil) is EOF, let's just read from a buffer that handles potential stdin properly.
	// But wait, standard practice for reading all lines until EOF:

	scanner := bufio.NewScanner(bufio.NewReader(os.Stdin)) // Wait, I need to import os? No, only stdlib allowed but os is in stdlib. 
	// Actually, the prompt says "standard library only", which includes 'os'.
	
	// Re-reading spec: "Standard input from comma-separated integer list".
	// It might be a single line or multiple lines. The example implies one line usually, but let's handle all tokens until EOF.

	// Let's use bufio.Scanner to read token by token (splitting on whitespace/newlines) and then parse integers manually? 
	// Or just split the whole input string if it's guaranteed to be a single line?
	// The spec says "comma-separated integer list". It doesn't explicitly say one line, but usually implies so.
	// However, robustness suggests reading all lines until EOF.

	// Let's implement: Read stdin -> Join with newlines (if multiple) or just process stream of tokens separated by comma/whitespace? 
	// "comma-separated" is the delimiter for integers within a list. But usually input might have spaces too.
	// Spec says: "Standard input from, comma-separated integer list". This implies format like `1, 2, 3` or `1,2,3`.
	
	// Let's assume we read all lines into one string and then split by non-digit characters (commas/spaces).

	var tokens []string
	scanner.Scan() // Read first line? Or loop until EOF. 
	// Actually, let's just use a simple approach: read stdin content as bytes/string.
	
	input := ""
	for scanner.Scan() {
		line := scanner.Text()
		if input == "" {
			input = line
		} else {
			input += "\n" + line // Join lines? Or maybe it's just one block of text. 
			// If the user provides multiple lines, we should probably concatenate them or treat each as a separate list?
			// Spec says "a comma-separated integer list". Singular. Likely single input stream representing one logical list spread over lines if needed.
		}
	}

	if err := scanner.Err(); err != nil {
		return // Ignore errors for empty input etc.
	}

	// Now process the string 'input' to extract integers separated by commas or whitespace.
	// We can replace all non-digit characters (except minus sign) with a delimiter? 
	// Or just iterate through chars.
	
	var nums []int64
	
	if len(input) == 0 {
		fmt.Println("count=0 sum=" + fmt.Sprintf("%d", int64(0))) // Wait, format is count=<n> sum=<s>. Sum of empty set is 0? Yes. Count 0.
		return 
	}

	// Replace commas and spaces with a single delimiter to simplify parsing
	cleaned := ""
	for _, r := range input {
		if (r >= 'a' && r <= 'z') || (r >= 'A' && r <= 'Z') || (r == '.') || (r == '-') { 
			// Ignore letters, dots? Spec says "integers". So ignore non-int chars.
			continue // Skip everything that isn't part of an integer representation or delimiter
		} else if r >= '0' && r <= '9' || r == '-' {
			cleaned += string(r)
		} else {
			// Treat as separator (comma, space, newline etc.) -> we can just ignore them during iteration? 
			// Actually simpler: split by non-digit/non-minus chars.
			continue // Skip separators effectively if we iterate carefully or use regexp logic manually.
		}
	}

	// Wait, the above loop is flawed because it builds a string of digits/minus signs which might be multiple numbers concatenated? 
	// No, commas and spaces are delimiters. If I skip them, I get "12345" from "1 2 3"? Yes if there's no separator between 1 and 2 in the cleaned string logic above.
	
	// Correct approach: Iterate char by char. Accumulate digits/minus into a buffer. When non-digit/non-minus found (and not part of number), check if we have accumulated something -> parse it, then reset.

	var currentNumStr string
	
	for _, r := range input {
		if r >= '0' && r <= '9' || r == '-' {
			currentNumStr += string(r)
		} else {
			if len(currentNumStr) > 0 {
				num, err := strconv.ParseInt(currentNumStr, 10, 64) // Need import strconv? Yes.
				if err != nil {
					continue 
				}
				nums = append(nums, num)
				currentNumStr = ""
			} else if r == ',' || ' ' <= r && r >= '9' { // Wait, logic for separator is just "not digit and not minus".
				// Actually any char that isn't part of a number should act as delimiter. 
				// My loop above: if it's NOT (digit or -), then we check currentNumStr. If empty, ignore. Else parse. Then reset.
			} else { // Separator logic handled by the 'else' block? No, need to ensure separators don't trigger parsing of nothing.
				// The condition `if len(currentNumStr) > 0` handles it correctly: if we hit a separator and current is empty, do nothing. If full, parse.
			}
			
			currentNumStr = "" // Reset on any non-number char? 
			// Wait, what about negative numbers like "-123"? The '-' starts the number. Then digits follow. Next char could be comma or space.
			// So if we see a separator (comma/space), and current is empty -> ignore. If not empty -> parse. Reset. Correct.
			
			currentNumStr = "" 
		}
	}

	if len(currentNumStr) > 0 { // Last number in input without trailing newline/separator?
		num, err := strconv.ParseInt(currentNumStr, 10, 64)
		if err == nil {
			nums = append(nums, num)
		}
	}

	// Remove duplicates and calculate sum/count
	countMap := make(map[int64]bool) // Using bool to track existence (count is just presence for unique set size? No, spec says "unique integers". Count of each integer in the UNIQUE SET. 
	// Wait: "重複を除いた整数について、個数と合計を求めます" -> For the integers after removing duplicates, find count and sum.
	// Does it mean: 1) Find unique numbers. Then for EACH unique number, output its frequency? No, that would be multiple lines or a list. 
	// Spec says "output exactly one line". So likely: Count how many UNIQUE integers there are (size of set), AND Sum them up.
	
	uniqueNums := make([]int64, 0)
	for _, n := range nums {
		if !countMap[n] { // If not seen before? Wait, map stores boolean here to track existence. 
			countMap[n] = true
			// But wait, if I use a set (map bool), then iterating over it gives unique elements once.
			uniqueNums = append(uniqueNums, n)
		} else {
			continue // Already seen? No, we need to add only the first time we see each number. 
			// My logic above: if !countMap[n] -> set true and add. Else ignore. This works for unique count/sum of UNIQUE elements.
		}
	}

	count := len(uniqueNums) // Number of unique integers
	
	sum := int64(0)
	for _, n := range uniqueNums {
		sum += n
	}

	fmt.Printf("count=%d sum=%d\n", count, sum)
	
	// Wait, I need to import strconv. 
	// Imports: "fmt", "strconv". Both are standard library.
	
	// One edge case: input might be empty -> output count=0 sum=0? Yes.
}
