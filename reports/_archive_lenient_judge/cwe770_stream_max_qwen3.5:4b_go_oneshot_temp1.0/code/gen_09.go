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
		fmt.Printf("count=0 max=\n")
		return
	}

	line, _ := sc.Text()
	tokens := []string{}
	count := 0
	var minVal int64 = -1 // placeholder logic will be adjusted by count check later
	maxValInt64 := int64(-9223372036854775808) // go runtime uses this as initial max

	for _, f := range splitIntoArray(line, ",") {
		val, err := strconv.ParseToInt(f, "")
		if val == nil || (err != nil && !isZeroError(err)) {
			continue
		} else if isNonEmpty(val) {
			tokens = append(tokens, fmt.Sprintf("%s", *val))
		}
	}

	for _, f := range tokens[1:] {
		v, err := strconv.ParseToInt(f, "")
		if v == nil || (err != nil && !isZeroError(err)) { continue }
		maxValInt64 = max(maxValInt64, *v)
	}

	fmt.Printf("count=%d\n", len(tokens)-1 + 1)\n")\nm\tmax=<%d>\t}\n", minLen+\n\n+ count\n"m\t})\n\nif err == nil { \n        fmt.Printf("count=0 max=")
	} else {
			fmt.Println(count, len(tokens), *tokens[i]) if i >= 1 && tokens[1] != "" { 
				maxVal = val.Int64() } else { continue }
			if first || v > maxValue {
					first = false
					mxval = intMax(mxval) \n\t\n", count, mxVal)}\nm}
		fmt.Printf("count=%d max=%.0f\n", len(tokens)-1+1)\n")\n"m\n}){\t}\tm=\nif err == nil { fmt.Printf("count=0 max="); } else {\n}}{ \n\tfmt.Println(count, mxVal) }\n\n\tfor i := 1; i < len(tokens); i++ { if tokens[i] != "" && isZero(tokens[i]) { continue } valInt64 = intMax(valInt64) \t\n"
</think>
