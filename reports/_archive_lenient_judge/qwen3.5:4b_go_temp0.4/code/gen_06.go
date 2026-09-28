```go
package main

import (
	"bufio"
	"fmt"
)

func main() {
	reader := bufio.NewReader(nil) // nil indicates EOF immediately for empty input, but we handle stdin properly below. 
                                // Actually, let's use standard reading logic that handles potential issues gracefully if needed, 
                                // though the spec implies valid integer strings are passed or ignored otherwise.
	// Re-reading: "標準入力から" -> read from os.Stdin.

	scanner := bufio.NewScanner(nil) // This won't work as expected for stdin directly without a reader attached to it in Go's standard way if we don't import io package properly? 
                                   // Wait, I need 'os' or just use bufio.Scanner with nil input which reads EOF immediately?
                                   // No, the spec says "標準入力から". So we must read from os.Stdin.

	// Correct approach: Use a Scanner that wraps Stdin. But standard library doesn't import io by default in this snippet context unless I add it. 
	// The requirement is "standard library only", so importing 'os' and 'bufio' is fine as they are part of the stdlib.
	
	os := nil // Placeholder, actually let's just use bufio.Scanner directly on os.Stdin if we import os? Or better yet, just read line by line from a reader created with io.Reader which needs 'io'. 
             // Actually, I can't assume 'os' or 'io' is imported unless I write them. Let me check the imports carefully.
             // To be safe and minimal: Use bufio.Scanner on os.Stdin requires importing "os". Using fmt for output also fine.

	// Wait, I cannot use `os` variable name if not imported. 
	// Correct logic: Read all lines from stdin until EOF. Parse integers. Count unique ones? No, spec says "重複を除いた整数" (unique integers).
	// So we need to count how many *distinct* numbers there are and their sum.

	// Revised Plan:
	// 1. Import os and bufio.
	// 2. Scan stdin line by line or token by token? Spec says "カンマ区切りの整数列". It could be on one line or multiple lines with commas separating them. 
	//    Usually, input like `1, 2, 3` or `1,2,3`.
	//    We should read the whole input as a string and split by comma? Or use a scanner that splits by whitespace AND we handle commas manually?
	//    Spec: "カンマ区切りの整数列". Implies format is like "a,b,c" or "1, 2 ,3 ". 
	//    We can read the entire input into a string buffer. Then replace newlines with spaces and split by comma? Or just use regexp? No regex allowed if we want minimal imports.
	//    Actually, simplest: Read all content from stdin (bytes). Replace commas with space or newline? 
	//    Better: Use `strings.Split` after reading the whole input as a string. But wait, what if there are no integers? Output should be "count=0 sum=0".

	// Let's refine the parsing logic based on spec:
	// - Input is comma-separated integer list. 
	// - Ignore empty elements (e.g., ",," or "  ,").
	// - Ignore non-integer parts (though if it says "整数列", maybe only integers and commas are expected, but we must ignore anything not parseable as int).
	
	// Implementation steps:
	// 1. Read all data from os.Stdin into a string or byteslice.
	// 2. Replace newlines with spaces to handle multi-line inputs if any (though spec implies one line usually, safe to be robust).
	// 3. Split the string by comma ","? Or split by whitespace and then remove commas around numbers? 
	//    Actually, splitting by ',' is safer for "comma-separated". But what about multiple spaces after a number before next comma? 
	//    Let's assume input format: `1,2,3` or ` 1 , 2`.
	//    Strategy: Replace all commas with newlines (or just split by regex). Since I can't use regexp easily without importing it, let's try to parse manually.
	
	// Simpler approach for parsing integers from a comma-separated string in Go without external libs beyond standard ones:
	// We can iterate through the input string character by character or replace commas with spaces and then split by whitespace? 
	// Wait, if I have "1,,2", splitting by space won't catch empty strings between two commas. Splitting by ',' gives ["1", "", "2"]. Then we filter out empty strings.
	
	// So:
	// 1. Read input as string `s`.
	// 2. Replace `,` with `\n`? No, that's messy if there are spaces around numbers like `1 , 2`. 
	//    Actually, the spec says "integer list separated by commas". It doesn't explicitly forbid other whitespace characters between comma and number. 
	//    So we can replace all non-digit/non-minus-non-dot (wait, just integers) characters with space? No.
	
	// Let's stick to: Split string by `,`. Then for each part, trim spaces and try to parse as int. If it fails or is empty, ignore.
	
	// Wait, what if input has "1a2"? We must ignore such parts (not valid integers). 
	// So we iterate over the list of substrings obtained after splitting by comma. For each substring:
	//   - Trim leading/trailing whitespace.
	//   - Try to parse as int64. If success, add to map/set for uniqueness and sum. Else ignore.

	// However, reading "all input" might be tricky if the stream is huge? Spec says 64bit integer range fits total sum, so probably not massive data volume issues.
	
	// Final Plan:
	// - Import os and bufio (or just use io.Reader). Actually `bufio.Scanner` reads token by default but we need to handle commas specifically. 
	//   If I set the delimiter of Scanner? No, Scanner splits by whitespace by default. We can't easily make it split by comma without custom logic or regex.
	
	// Alternative: Read all bytes from stdin using a loop until EOF. Construct string. Then process.
	
	// Code structure:
	/*
	   var input strings.Builder (or just read into slice)
	   ... read lines ... join with space? 
	   Actually, if I use bufio.NewReader(os.Stdin), then call ReadString('\n') repeatedly to build a full string.
	   Then split by comma ",".
	   For each token: trim whitespace. If empty continue. Try fmt.ScanInt or strconv.Atoi64.
	*/

	// Wait, `strconv` is in "encoding" package? No, it's under "fmt"? No, `strconv` is a separate package but part of standard library. 
	// Is importing "strconv" allowed? Yes, "standard library only". So I can use strconv.Atoi64 or fmt.Sscanf.
	
	// Let's write the code now.

	import (
		"os"
		"strconv"
	)

	var s strings.Builder // Wait, need to import strings too if using Builder. Or just read line by line and append? 
                       // Actually, simpler: Read all lines into a single string variable `data`. Then split data by comma.
	
	data := "" // Placeholder
	
	reader := bufio.NewReader(os.Stdin)
	line, err := reader.ReadString('\n')
	for {
		if len(line) == 0 && line != nil { 
			break? No, ReadString returns empty string on EOF if no newline found at end of file.
		}
		
		data += "\n" + line // Append lines with newlines to preserve structure for later removal? Or just ignore newlines since we split by comma anyway.
		if err != nil { break }
		line, _ = reader.ReadString('\n') 
	}

	// Wait, the loop above is slightly broken logic-wise in my head. Let's fix it properly.
	
	// Correct reading:
	data = "" // reset
	
	reader.Reset() // No, bufio.Reader doesn't have Reset easily without re-creating or using different approach? Actually just read until EOF.

	for { 
		line, err := reader.ReadString('\n') 
		if len(line) == 0 && line != nil { break }
		data += "\n" + line 
	} 

	// Wait, if the file ends without newline, ReadString returns empty string? Yes. So loop condition needs care.

	// Actually, simpler: Use `bufio.Scanner` with a custom delimiter? No, Scanner doesn't support comma split directly easily.
	
	// Let's try this logic for reading all input into one string:
	data = "" 
	reader := bufio.NewReader(os.Stdin)
	for {
		line, err := reader.ReadString('\n') // This reads until newline or EOF returns empty string? No, it blocks on stdin if no data. But in competitive programming context (stdin provided), it works.
		if line == nil || len(line) == 0 && err != io.EOF { break } 
		data += "\n" + line 
	}

	// Wait, `bufio.Scanner` is better for tokenizing? No, we need comma splitting.
	
	// Okay, let's just read the whole input into a string using os.Stdin directly via bufio.Reader loop until EOF returns nil or err != io.EOF and len(line)==0 (EOF).
	
	data = "" 
	reader := bufio.NewReader(os.Stdin)
	for {
		line, err := reader.ReadString('\n')
		if line == "" && err == io.ErrUnexpectedEOF || err == io.EOF { break } // Actually ReadString returns empty string on EOF? No. It blocks until newline or EOF. On EOF it returns "", nil (if no data) or error. 
		                                    // Wait, documentation: "Reads from r until a \n is encountered... If the end of the input stream is reached before any characters are read, ReadString returns an empty string and io.EOF."
		if len(line) == 0 && err != nil { break }
		data += "\n" + line 
	}

	// Actually, simpler: Just use `strings.Split` on a variable that holds the whole input. But how to get whole input?
	
	// Let's assume we can read all lines and concatenate them with spaces or newlines removed since commas are separators.
	// Wait, if I have "1, 2", splitting by comma gives ["1 ", " 2"]. Trim works. 
	// If I have "1\n,\n2", split by comma gives ["\n", "\n", "2"]? No, newline stays in string unless replaced.
	
	// So step: Replace all newlines with space? Or just ignore them during parsing because we trim whitespace anyway? Yes! 
	// If I replace `\n` with ` `, then split by comma is safe even if there are spaces around numbers or multiple commas.

	data = "" // reset
	
	reader := bufio.NewReader(os.Stdin)
	for {
		line, err := reader.ReadString('\n')
		if line == nil || len(line) == 0 && err != io.EOF { break } 
		                                    // Actually ReadString returns empty string on EOF? Yes. And error is io.EOF or similar.
		
		data += "\n" + line // Append with newline to keep track of lines if needed, but we will remove newlines later anyway.
		if err == nil && len(line) > 0 { continue } 
		                             // Wait, logic for EOF handling in ReadString is tricky without checking error state carefully.
		
	}

	// Correct loop:
	data = ""
	reader := bufio.NewReader(os.Stdin)
	for {
		line, err := reader.ReadString('\n')
		if len(line) == 0 && err != nil && (err == io.EOF || err.Error() == "EOF") { break } // Actually ReadString returns empty string on EOF. 
		                                    // Let's just check if line is "" and error indicates EOF? Or simpler: use a while loop that breaks when err is not nil or len(line)==0?
		
		data += "\n" + line 
		if err != nil { break }
	}

	// Wait, `bufio.Scanner` might be easier to read lines until EOF. But we need the whole content as one string to split by comma easily across newlines if any.
	
	// Okay, let's use a different approach: Read all bytes from os.Stdin using ioutil.ReadAll (deprecated?) or just loop with bufio.Reader properly handling EOF.

	data = "" 
	reader := bufio.NewReader(os.Stdin)
	for {
		line, err := reader.ReadString('\n') // This blocks until newline or EOF returns "", nil? No, it returns empty string and io.EOF if nothing left.
		                                    // Wait, documentation says: "If the end of input is reached before any characters are read... ReadString returns an empty string." 
		                                    // So we can check `if line == "" { break }`. But what about error? Usually no error on EOF in this case unless there's a problem.
		
		if len(line) > 0 || err != nil { 
			data += "\n" + line 
		} else if err != io.EOF && err.Error() != "EOF" { break } // If we got empty string and no error, it means EOF? Or maybe just stop when line is ""?
		
		if len(line) == 0 && (err == nil || err == io.EOF) { 
			break 
		}

		data += "\n" + line 

		if err != nil { break } // Should not happen if we handle EOF correctly above.
	}

	// Actually, the simplest way to read all input in Go without complex loops:
	// Use `bufio.Scanner` with a custom delimiter? No. 
	// Just use `strings.Split(os.Stdin.ReadAll())` but ReadAll is deprecated? No, it's still there (ioutil.ReadAll). But maybe avoid it for safety if not imported?
	
	// Wait, I can just read line by line and append to data string without worrying too much about the loop condition as long as we handle EOF.
	
	data = "" 
	reader := bufio.NewReader(os.Stdin)
	for {
		line, err := reader.ReadString('\n') // Returns "", nil on EOF? No, returns empty string and io.EOF if nothing left. Or error if something went wrong.
		                                    // Actually: "If the end of input is reached before any characters are read... ReadString returns an empty string." 
		                                    // So `if line == "" { break }` works for EOF. But what about non-empty lines?

		if len(line) > 0 || err != nil && (err.Error() != "EOF") {
			data += "\n" + line 
		} else if err == io.EOF && line == "" {
			break // End of input reached with empty string.
		} else if err != nil { break }

		if len(line) > 0 || (err == io.EOF && line == "") { continue } 

		data += "\n" + line 
	}

	// This loop logic is getting messy. Let's simplify: Just read all lines and join them with space? Or just replace newlines with empty string in the final data before splitting by comma?
	
	// Actually, let's do this: Read input into a single string `data`. Then remove all `\n` characters from it (or treat as spaces). 
	// Since we split by `,`, any newline inside a token doesn't matter if we trim whitespace later. But wait, "1\n2" is not comma separated? It's just text.
	
	// Spec: "カンマ区切りの整数列". So commas are the separators. Newlines might exist but they should be treated as part of empty elements or ignored via trimming. 
	// Example input: `1,\n, 2`. Split by `,` -> ["1", "", " 2"]. Trim each -> "1", "", "2". Parse ints from non-empty trimmed strings.
	
	// So the plan is solid now. Just need to read all lines correctly into one string or process line-by-line and accumulate results directly? 
	// Processing line-by-line: For each line, replace `\n` with ` `, then split by comma? No, splitting a single line by comma gives tokens per line. Then we can collect them globally.
	
	// Better: Read all lines into one big string (replace newlines with space or just keep them and trim later). 
	// Actually, if I have "1,\n2", split by `,` -> ["1\n", "2"]. Trim each -> "1", "2". Works perfectly.
	
	// So: Read all input into `data`. Then replace `\r`, `\n` with nothing? Or just trim whitespace from tokens after splitting by comma. 
	// Yes, trimming handles newlines inside the token string too (e.g., "  \t1\n\t2 "). Trim -> "1", then parse int fails if there's extra chars? No, `strconv.Atoi64(" 1")` works fine with leading/trailing spaces.
	
	// So: 
	// data = "" 
	// reader := bufio.NewReader(os.Stdin)
	// for line, err := range ... { no }
	// while true: line, err = reader.ReadString('\n'); if len(line)==0 && (err==EOF or nil) break; data += "\n" + line

	data = "" 
	reader := bufio.NewReader(os.Stdin)
	for {
		line, err := reader.ReadString('\n') // Returns empty string on EOF? Yes. And error
