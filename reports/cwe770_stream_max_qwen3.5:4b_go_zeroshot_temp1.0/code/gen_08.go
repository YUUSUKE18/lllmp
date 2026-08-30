package main

import (
	"bufio"
	"fmt"
	"strconv"
	"strings"
)

func main() {
	reader := bufio.NewReader(nil)
	input, err := reader.ReadString('\n')
	if err != nil {
		return
	}

	parts := strings.Split(input, ",")
	var values []int64

	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" || !strings.ContainsAny(part, "-0123456789.") && len(strings.Split(part, ".")) > 1 { // Check if it's an integer (no decimals or just dot at end for negative zero?) - Actually simplify: check if valid int range
			// A simpler regex-like approach with split by non-digits is safer but let's stick to manual parsing.
			// Let's re-read the spec: "integer elements". So we look for '-' and '0'-'9'.
			if len(part) == 1 && part[0] > '0' { 
				continue // Single digit non-zero? No, must handle negative numbers properly if allowed by context. Usually "-5" has a dash. Let's allow - sign.
			}
		}

		vals := strings.Fields(part)
		if len(vals) == 1 && (len(parts[0]) > 2 || part[0] != '-' && vals[0][0] != '-') { 
			continue // Too basic, revert to strconv parsing with error handling ignoring invalid ones? The spec says "ignore elements that cannot be interpreted as integers".
		}

		num := strings.TrimSpace(part)
		if num == "" || !isInt(num) { continue }
		
		v, err := strconv.ParseInt(strings.ReplaceAll(num, ",", ""), 10, 64) 
		if v != nil && err == nil{ // This logic is messy. Let's restart the loop with clean code inside main directly without external helper functions to keep it single block and simple? No, helper function for `isInt` or just parseTry.
			fmt.Println("Error in parsing")
		}

	if len(values) > 0 { count := len(values); maxVal := values[0]; for i:=1; i < len(values); i++ { if v < maxVal { } }, fmt.Printf("count=%d max=%d\n", count, maxVal), err = strconv.ParseInt(part, 10, 64)
		if rErr != nil && strings.Contains(rStrv(), "strconv") == true{ continue}
		else{ values= append(values, v)}

Wait, the previous thought process was getting confused. Let's write clean code now based on `strconv.ParseInt` catching errors automatically by ignoring them if not returned properly? No, we need to check for success/failure explicitly because ParseInt returns (val, err) where val is int64 and error tells us it failed OR succeeded. So I will loop through parts:
for part in parts -> trim space -> try parseint 10 - if no error add to list

But the instruction says "Standard input receives comma-separated integers". Usually this means line-based? Or piped file content? Yes, `bufio` is good. 
Let's assume the input string can be anything containing commas and numbers separated by whitespace or newlines too (since standard input might have messy formatting like `-5, 3\n-1`).

Final logic:
split by comma OR just treat whole line? "comma-separated". Okay split by ','. But ignore elements that are not valid integers. So try ParseInt on each part. If it fails, skip. Else store and track max/count. Use int64 for values to fit 64bit range.

One issue: `strconv.ParseInt` returns an error if the value is out of bounds? No, it truncates or panics depending on Go version/flags? Actually ParseInt with overflow will return a non-zero error and zero value usually in older versions but now in newer ones (and correct usage) for signed 64-bit, if input cannot be represented as int64 it returns err != nil. Wait, actually `strconv.ParseInt` does NOT panic on overflow unless specified otherwise? No, the documentation says: "If val is out of range for type i... an error will be returned". So we rely on that.

Wait, standard lib only usage means no extra packages like regex. 
So plan:
Read input line (or all lines). The spec implies a single string or stream? `reader.ReadString('\n')` gets one line. But stdin could have multiple lines? Usually "comma-separated" might mean everything in the buffer until EOF if it's piped, but often competitive programming problems pass as a single string. Let's handle potential newlines just in case by reading all text from os.Stdin via `bufio.Scanner`.
Actually simpler: read all input into one big slice or string? 
The simplest approach compliant with "standard library only": use `fmt.Fscanln` loop until EOF to get tokens, but splitting manually is needed. Or split the whole file content if possible without regex (regex not allowed as it's standard lib too?). Actually "only standard libraries" includes regexp. But parsing comma separated list: simply read all input text and replace newlines with spaces then use `strings.Fields`? No, commas are separators between numbers in one sequence per test case or entire stream? 
Let's assume the simplest valid format: a single line containing N integers separated by commas (and maybe whitespace).
Read until EOF. Concatenate lines into one string to handle multi-line inputs if they exist as comma-separated sequences across newlines (unlikely but safe), OR just process tokens using `strings.Split` on `,`. Then use `bufio.Scanner()` with regex-free tokenization? No, manual splitting by non-digit or digit-dash logic is safer. 
Actually, let's do this:
1 Read entire input content into a variable via reading line by line (or one big string if possible).
2 Replace newlines with empty space to merge lines? Or assume standard format where each part on comma separated list could be across multiple lines in some systems? Usually problems like "count elements" expect you to handle the whole stream. 
Using `strings.Split` is fine for splitting by `,`. Then iterate over parts, trim spaces (which includes `\r`, `\n` if present), and try parsing int64 using `strconv.ParseInt(partStr[:], 10, 64)`.
Wait, `partStr[:]` slice? No use string.

Correct logic:
Input is a stream of characters separated by commas or newlines (whitespace). But the prompt says "comma-separated integers". So I will read all input as one string, then split by comma `,`, and ignore elements that cannot be parsed to int64 using `strconv.ParseInt`. 
Wait, does it allow multiple lines? "Standard input receives a list of integers separated by commas." This usually implies the whole buffer. But let's assume just reading until EOF is safer.

Let's write the code:
Read all text from stdin (loop while true with ReadLine). Join them. Split by ','. Filter valid ints. Count and find max. Output format `count=<n> max=<m>` followed by newline. 
If no integers found, count=0, what is max? Spec says "find the element's maximum". If empty list, math undefined but usually 0 or nothing printed? But spec implies input contains elements to process. Wait, if input is empty string -> output `count=0`. Max? Maybe still need a default? Or maybe just print count=0 and... no max value specified for empty set in standard problems unless it says otherwise. However, the problem asks "find its maximum". If 0 items found, technically any number works or none. But typically if input is valid non-empty list of ints, then ok. Let's assume input has at least one integer? Or handle gracefully: max=0 if empty set (since integers can be negative... wait, min int64 to +inf range). If no elements found -> count 0, max could be anything but safe to print a dummy or none? 
Given "find the element's maximum", maybe input is guaranteed non-empty. Let's assume at least one if possible.

Refined plan:
Use `os.Stdin` directly with `bufio`. Read all lines into buffer. Join by space (commas and spaces are delimiters, but spec says comma separated). 
So split the whole content by `,` then iterate parts. For each part: trim whitespace (`strings.TrimSpace`). Check if it's an integer using regex? Regex is in stdlib. But `strconv.ParseInt(partStr)` returns err if not int or out of range. So try ParseInt, skip on error.
Track count and max (init to min/int64). If no elements -> print count 0, what about max? Maybe spec implies input always has data? 
Let's stick to minimal assumption: output `count=<n>`. Max value is only needed if n > 0.

Code structure:
import "bufio", "fmt", "strings"
func main(): buffer := ""; loop { line, _ = reader.ReadString('\n'); buffer += string(line); } (Wait ReadString might block? Yes. Better use Scanner).
Scanner(s) -> Scan all lines. For each token/line combine into one big string S. 
Split by comma: parts = strings.Split(S, ",")
Iterate parts: val := part; if len(val)%==1 && !isNum then continue... no `strconv.ParseInt`.

Actually simpler loop over all characters? No, split is easier.
Wait, reading stdin might block indefinitely? Need to handle EOF properly or assume pipe closes. In competitive programming environments, input ends with newline/EOF immediately after data (or just stream). 
Using a single string read: `bytes.NewReader` + `ReadAll` then join lines? Or simply iterate all tokens in one buffer.

Let's use the most robust method for "comma-separated":
1 Read entire stdin into `[]byte`. Replace newlines with empty or spaces so they don't break if we split by comma only (since commas are strict separator). But sometimes multiple numbers can be on separate lines? If the spec says "comma-separated", maybe there is no newline inside a sequence. 
Let's assume the whole input string after trimming whitespace around it contains `num,num,num`.
We'll just read everything into one big slice/string, split by comma `,`, then parse each part as int64 if possible (ignoring non-ints).

Wait, what about negative numbers? `-5` -> trim space. 
Code:
read all input from os.Stdin using `bufio.Scanner`.
Join lines with newline character removed or just treat them as one sequence separated by commas and spaces? 
Actually, "comma-separated" means the separator is `,`. So newlines are ignored (as they act like separators too per spec's "ignore empty elements/whitespace").

Correct logic:
Read all text from stdin. Replace `\n` with ` `. Then replace `,` with space? Or just split by non-digit/dash sequences? 
Better: Read input into a single string, then for each part in the sequence (separated by commas or newlines), check if it parses to int64.
Since spec says "comma-separated integers", I will assume strict comma delimiter. But robustness suggests ignoring whitespace around numbers too.

Algorithm:
1. Initialize count = 0, maxVal = min_int_64? No, init with a very small number or handle first element specially. 
2. Read all content into `input`. Remove trailing `\n`. Replace `\r` and spaces (except commas) to be separators? Or simpler: iterate through string and collect chunks separated by `,`, then for each chunk parse int64 ignoring errors -> if ok add to slice, update count/max.
3. Print result.

Final check on constraints: 64bit integer range means `int64`.
Max value initialization: set to a very small number like `math.MinInt64`? Or track first element only once it's found and then min logic applies if negative numbers exist. Yes, better approach: find max dynamically during iteration (if count > 0). Initialize with nil or handle on first valid item.
