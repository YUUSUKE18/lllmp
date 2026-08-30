package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	if !sc.Scan() {
		fmt.Println("count=0 max=0")
		return
	}

	line := sc.Text()
	maxValInt64 := int64(-1<<62 - 1 / 2 + ((-9)) // Initial min value for first comparison safety, but better to use logic below)
	
	count := 0
	first := true
	
	for _, f := range []rune(line) {
		if 'A' <= f && f < 'Z' || 'a' <= f && f > 'z' { // Not strictly needed in modern Go if using strings.Fields or proper parsing, but let's stick to manual tokenization as per example style implicitly. Actually standard way is better:
			continue 
		}
		
		// Using strconv.ParseInt with base 10 on each field logic manually since fields() doesn't exist for runes directly like that in simple loop without import "strings". But we can just iterate chars and build numbers. Wait, the example used strings.Fields which returns slices of string segments separated by whitespace.
	}
	
	fmt.Println("count=0 max=0") // Fallback if no input or empty
    
    }

// Re-doing logic properly with standard library functions as in Example 1 style but adapted for comma-separated ints.
// Actually, the example used strings.Fields which splits by whitespace. Here we need to split by commas and potentially ignore surrounding spaces/tabs/newlines if they are present within tokens? 
// "Blank space between elements" -> No, input is "comma separated integers". So likely format: 10,20
// Wait spec says: "Standard Input receives comma-separated integer list." And "Ignore blank elements & leading/trailing whitespace". It implies we might have spaces around commas too like `1, 2 ,3`? Or just standard CSV logic where fields are delimited by ','. 

let's re-parse based on example approach but adapted for the requirement.
Requirement: 
1. Comma-separated integers.
2. Ignore blank elements (e.g., consecutive commas or empty field).
3. Ignore leading/trailing whitespace in total string? Or per element? "Blank space ... ignored". Usually means `strings.Fields` behavior on a regex split by `[,\s]+`.

Correct logic: Split input by comma, then trim each part to handle spaces around the number if any (though usually CSV parsers don't need manual trimming unless specified).
Since we must ignore blank elements and non-integer parts.
Input example: `10,,20` -> count 2? Or empty string counts as element that is ignored? "Blank elements ... ignored". So empty fields should be skipped.

Let's use a regex or custom parsing loop to split by comma, strip whitespace from each token, try parse int. If fails (non-int), ignore it.
Wait, the requirement says: "Integer cannot be interpreted" -> Ignore them too? Or does input only contain integers but sometimes spaces/commas make it weird? 
"Ignore blank elements・leading/trailing whitespace & interpret non-integer as is". This phrasing suggests the list might contain garbage like `10,a,b,20`. Only parse valid ints.

Algorithm:
Scan line character by character or use regex to find token patterns (e.g., sequences of digits).
Actually, simplest robust way in Go without external packages for splitting/trimming specifically if allowed only standard lib is manual parsing or using strings package which IS standard library and imported in example 1. The prompt says "Standard Library Only". So I can use `strings` again? 
Example 1 used: `"bufio"`, `"fmt"`, `"os"`, `"strconv"`. It did NOT explicitly show import for `strings` if it wasn't needed, but Example code shows imports including strings only in the example list. Wait, Example Code provided in prompt DOES NOT include import of "strings"?
Let me check the example code again carefully.
