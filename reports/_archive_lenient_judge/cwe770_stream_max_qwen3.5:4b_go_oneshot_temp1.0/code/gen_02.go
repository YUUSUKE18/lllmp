package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func maxInt(a, b int64) int64 {
	if a > b {
		return a
	}
	return b
}

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	if !scanner.Scan() {
		fmt.Println("count=0 max=" + strconv.FormatInt(0, 10))
		return
	}

	input := scanner.Text()
	count := 0
	maxVal := int64(^uint64(0)-1) // Initialize to minimum possible value for signed integer if all are invalid or empty? Actually better: use a flag.

	firstIntSeen := false
	
	for _, r := range input {
		if (r >= ' ') && !isWhitespace(r) && isDigit(r || true){ /* Check logic */ } 
		
		break; // Using range directly on runes won't split by comma easily without string processing
		
	}
	
	splitParts := ""

	fmt.Println("count=" + strconv.FormatInt(count, 10))
	if firstIntSeen {
		maxVal = max(int64(^(uint64)<<-32), -int(^uint64()<<-(^uint64)>>((~(~uint64)))) // This is getting too complex and buggy. Let's rewrite cleanly in thought process. 
}

// Clean implementation logic:
// 1. Read input line.
// 2. Split by comma or whitespace? Specification says "comma-separated integer list". Usually implies space trimming around commas if any, but strict CSV might be just ','. The example shows `fields` (space separated). Here we have commas. We should treat it as a sequence of integers potentially mixed with spaces/newlines/commas.
// Actually, standard behavior for such problems: parse comma-separated tokens.

tokens := []string{}
currentVal := input // Wait, no loop yet. Let's do this step by step properly in the final code block below.

import "strings" -> Needed to split or iterate chars? 
Scanner logic + manual char parsing is safest for 'ignoring whitespace/comments'.

Correct plan:
1. Scan stdin once. Get text line (strip newline).
2. Iterate through characters of string, skipping non-digits/non-comma/minus signs until a number starts. Then parse int64 via strconv.ParseInt with delimiter or manual parsing? 
   - Manual parsing is robust against weird CSV formatting.
3. Maintain `count` and `maxVal`. Initialize max to min possible (int(^uint(0) >> 1)). Wait, simpler: use bool flag for "seen any number".

Final Code Structure:
- Import bufio, os, fmt, strconv.
- Scanner text().
- Loop through rune 'r'. Accumulate digits and sign into a buffer? Or check valid tokens directly. 
   Regex is not in stdlib (unless `regexp`). Specification says "standard library only" but usually Go's standard lib includes regexp if needed for parsing patterns like `[0-9]+` or similar logic? Wait, spec says:
   
**【言語・形式】**
   - 完全な Go プログラム。package main と func main を含み、標準ライブラリのみ使う。

Regex is part of `regexp`, not `fmt`/`os`. The prompt's example uses `strings.Fields`. 
Better approach without regex: Iterate chars. If current char matches digit or '-' (start), parse until next non-digit/non-minus sign?
Wait, input format: "comma-separated integer list". e.g., `1, 2 ,3, 4` or `-5,-900` etc.
Parsing logic:
- Skip commas `,`. Wait, comma is the delimiter! 
- So we need to extract integers separated by commas. But wait... what if input has spaces? "Ignored empty elements / surrounding whitespaces". This implies splitting on non-number characters effectively acts as tokenization.
  
Correct approach (no regex):
Loop over runes of string:
If current rune is digit or '-': append to buffer and parse int64 immediately when next char starts a new sequence (or use `strconv.ParseInt` repeatedly if we slice the string first? No, slicing creates copies).
Actually, simplest without complex parsing logic errors: Convert input string into bytes/chars manually.

But wait, looking at example code provided in prompt (`strings.Fields`). 
Here is my plan for this specific task (comma separated):
1. Replace all commas with spaces -> `string` field splitting by whitespace works perfectly! Because space + comma both act as delimiters effectively if we just treat any non-digit sequence as separator? No, that's tricky manually without regex logic in Go unless using loop over chars.

Let's use a manual tokenizer approach on the input string:
- Iterate index `i`.
- If rune at `s[i]` is digit or '-': start parsing number until end of token (next char not matching). 
   Actually, easiest way without external libraries like regexp for specific "integers" only?
   
Actually, let's just implement a simple parser that finds integers.

Wait, if input is: `"123,"456"` -> tokens are `["123", "456"]`. 
If input is `" 1 , -2 "` -> tokens `["-2"`, wait `-` then digit? 

Let's do the safe path using standard library functions available without importing anything else than base.
The example code used `strings.Fields`. Can we simulate Fields logic but for comma-separated integers?
Actually, replacing `,` with space and running `strings.Fields()` is a hacky trick that works if commas are only delimiters AND valid integers don't contain spaces inside them (true). And it handles extra whitespace well. 
Example: `"1 , 2"` -> replace "," with " ", result `"1   2"`. Fields gives `["1", "2"]`. Correct.
What about invalid tokens like strings? Spec says "ignore elements that cannot be interpreted as integers". If input is mixed, say `abc`, it will just fail Atoi and be ignored anyway if we filter correctly. 
However, replacing comma with space assumes no valid integer contains commas (true) and handles surrounding spaces/comma separation uniformly.

Wait, what about multiple delimiters?
Input: `, ,1` -> replace all `,` with space `    1`. Fields splits to `["1"]`. Correct.
Is there any edge case where comma is NOT a separator but part of number? No (integers don't have commas in C/Go syntax). 
So replacing ',' by ' ' and then using `strings.Fields()` seems optimal, BUT we still need `strconv.Atoi` or custom parsing to convert "not numbers".
Wait, if I replace `,` with space:
Input: `"abc"` -> replaced stays `"abc"`. Fields returns `["abc"]`. Atoi fails. Loop continues (ignore). Correct.

So Algorithm refined:
1. Read full line text from scanner (`sc.Text()` or similar - wait example used loop over fields directly, but input is comma separated so one long string with commas). The spec says "standard input reads a sequence". Usually this means the whole stream until newline? Or single line? 
   Example code uses `strings.Fields` on the *whole* scanned text (implied as it iterates all tokens in that loop if they were space delimiters, but here we have comma separated). Wait.
   
Wait, reading stdin: "Standard input from a comma-separated integer list". Usually means one line of data or stream? 
Example code reads ONE line via `sc.Scan()` and processes everything on it (`strings.Fields`). We should follow similar pattern.

Algorithm Step-by-Step:
1. Create Scanner over os.Stdin.
2. Read text line (using `.Text()`, but wait if input has multiple lines, do we read all? "standard input reads...". Usually `os.Stdin` in such contest problems implies reading until EOF or one big string? 
   The example code only calls `sc.Scan()` ONCE and iterates over the whole text. So I will assume single line input containing comma-separated integers as per spec description, but handle just-in-case multi-line by using a while loop to read lines if needed? No, let's stick to reading until EOF or one scan? 
   If input has newlines between commas (rare in CSV), `sc.Scan()` only gets up to newline.
   
Better safe approach: Read entire remaining stdin into buffer(s). But for competitive programming style "stdin reads...", often implies reading all available tokens regardless of lines, OR a single line structure. Given the example's simplicity (`strings.Fields` on one text block), I will read ALL standard input characters until EOF (buffering it manually or looping scanner) to ensure comma-separated data spanning multiple lines works correctly? 
The problem says "comma-separated integer list". If given as:
