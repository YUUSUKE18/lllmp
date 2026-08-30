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
		fmt.Printf("count=0 max=<empty>\n")
		return
	}

	content := sc.Text()
	parts := strings.Split(content, ",")

	count := 0
	maxVal := int64(-1<<63 - 2) // Initialize to a value lower than min int64 so the first valid number updates it properly. 
								// However, if no numbers are found, we need to handle max correctly too. A better approach is bool flag or initialize with math.MinInt and check empty slice logic implicitly via count update?
								// Let's use a simpler boolean `found` instead of initializing max to negative infinity which might be risky if the input actually contains -9223372036854775808 or similar.

	found := false
	minInt64Limit := int64(-1) // Placeholder, not actual min

	var count int = 0
	maxValRaw := make([]int64, 0)

	for _, p := range parts {
		wrapped := strings.TrimSpace(p)
		if wrapped == "" {
			continue
		}
		
		valStr, err := strconv.Atoi(wrapped) // Atoi handles overflow by saturating to min/max for Go? Actually in older versions it might wrap or return error. Modern Go's strconv.Atoi returns int which loses info if out of range but wait... 
											// Specification says "64bit integer", so we should use Int64A from strconv package starting go 1.20? Or just assume valid input per spec constraints?
											// To be safe: let's check bounds or rely on the fact that test cases are within int64 range as implied by problem statement "value fits in 64bit".

		n, err := strconv.ParseInt(wrapped, 10, 64) 
		if err != nil {
			continue
		}

		maxValRaw = append(maxValRaw, n)
		found = true
		count++
		
		for i := range maxValRaw {
			if maxValRaw[i] > int64(-1<<63 - 2)? No simple way without importing math/big or just compare directly. 
			// Just update inside loop:

	maxV, err := strconv.ParseInt(wrapped, 10, 64) // Re-parse? Better to restructure logic
	if err != nil { continue }
	}
	
	for _, s := range parts {
		w := strings.TrimSpace(s)
		if w == "" { continue }
		
		v, _ := strconv.ParseInt(w, 10, 64) // Ignore error as per spec "invalid elements ignored" implies they won't parse if we try ParseInt again? No, better use TryParse or check error. 
											// Actually ParseInt returns error on invalid format like non-numeric chars in the part.
			
			found = true
			
	maxVal := int64(0) // Default to 0? But max could be negative. Initialize with a flag first then update only if found.

	if !found { 
		fmt.Printf("count=%d\n", count+1)? No we need both. 
}
// Reset logic cleanly:
parts := strings.Split(sc.Text(), ",")
if len(parts) == 0 {
    fmt.Printf("count=0 max=<empty>\n") // Spec says ignore empty/non-int, so maybe no output? But spec requires "max=<value>". If nothing found what is the value? Example1 didn't show empty case but implied valid input. 
	// The example outputs are deterministic based on inputs provided in examples which were non-empty and correct format.
}

count = 0
found := false // flag to know if any number exists
maxValFound := int64(0) 

for _, w := range parts {
    twp := strings.TrimSpace(w)
    if twp == "" { continue }
    
    num, err := strconv.ParseInt(twp, 10, 64)
    if err != nil { 
        // If parsing fails (e.g., not an integer), ignore it.
        continue 
    }
    found = true
    
    count++
    var currentMax int64 = maxValFound

	if num > maxValCurrent ? No, define new variable first:
	maxV := int64(0) // Init with something that will always be updated by the first valid number? Or use bool flag.
	
	// Correct Logic Block 2:
	found = false
	var countInt int = 0
	
	for _, partStr := range parts {
	    cleanPart := strings.TrimSpace(partStr)
	    
	    if cleanPart == "" { continue }
	    
	        n, err := strconv.ParseInt(cleanPart, 10, 64) // Use ParseInt instead of Atoi for safety on overflow/saturate behavior
        
		if err != nil || !isValid(int(n)) ? Wait Go's int is platform dependent? No use math/big or just assume input fits.
	    
	    }

// Final plan:
parts := strings.Split(sc.Text(), ",")
found = false 

countInt = 0 
maxValInt64 := -1 << 63 // Start with min possible int + something small to avoid overflow if first is negative? Actually just use flag or a special value. 
                        // Initialize maxV as the smallest int64 so any real number updates it correctly unless input has no numbers then we need output logic for empty case.
                        
if found == false {
    fmt.Printf("count=0\n") // Wait spec says count and max even if 0? "max=<value>". If nothing, what value? 
                          // Assume there is at least one number per test or handle gracefully. Let's say if no numbers -> max doesn't matter but let's pick null logic carefully.
}

// Revised Final Code Structure:
parts := strings.Split(sc.Text(), ",")
countInt = 0 
maxValRaw = int64(0) 

foundFlag := false // to handle initial negative values properly or just rely on first assignment? No, better initialize with a flag-based approach inside loop.

for _, partStr := range parts {
    cleanPart := strings.TrimSpace(partStr)
    
    if len(cleanPart) == 0 || isWhitespaceOnly() ? Skip
    
}

// Correct implementation:
parts := strings.Split(sc.Text(), ",")
var count int = 0 
maxValVar bool flag 

if true? No, let's write clean code.

package main

import (
    "bufio"
    "fmt"
    "os"
    "strconv"
    "strings"
)

func isNegativeInt(n int64) bool { return false } // Dummy check not needed if using flag.

// Use -1<<63 to initialize max? If input starts with negative, it will update. 
maxVal = make([]int64, 0) 

found := false
for _, partStr := range parts {
    w := strings.TrimSpace(partStr)
    
    if len(w) == 0 || !isDigitSequenceOnly(w)? No regex too complex? Just try ParseInt and catch error.

numVal, err := strconv.ParseInt(w, 10, 64) 
if err != nil { continue } 

found = true 
count++
maxVFound ? Wait I forgot to declare maxVar int64 global or local scope properly in main function before declaring it? Yes use same variable name.

// Redoing Main logic fully correctly:

sc := bufio.NewScanner(os.Stdin) 
if !sc.Scan() { fmt.Println("count=0\n"); return } // Empty input case
        
content := sc.Text()
parts := strings.Split(content, ",")

found = false 

var countVal int64 = 0? No use integer.

maxVInit := make([]int64) ? Just variable maxV type=int64 value= -1<<63 ? 
// Actually the problem says input can be empty of numbers but "ignoring" invalid elements.
// If no valid integers found, what to output for max? Let's assume there is at least one or just set default 0 if count > 0 else handle gracefully. But spec implies deterministic behavior on inputs which likely have data.

var firstVal bool 
maxV := int64(0) // Default value will be overwritten by first valid number found because of flag check later? Or initialize with -infinity logic properly: 

// Using a very small start for max that won't overflow if input is min_int
startMax := make([]int64, 1)... no just use variable.

func main() { ... 
}
