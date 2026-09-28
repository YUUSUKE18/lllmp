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
		fmt.Println("count=0 max=" + strconv.Itoa(0)) // 無効な入力または空の場合、最大値を 0 とするが要件により「整数として解釈できない要素も無視」なので実装上は最小初期値で良い。ただし、例のコードを見ると int の範囲に収まると仮定し max=0 がデフォクトだったため同様に扱うか、あるいは実際に使われる数値の下限まで下げるべきだが、問題文では「64bit 整数」とあるので long を使う必要がある。しかし Go では signed int は通常 32bit, uint8 などあり longは128 bit.
	}

	var longs []int64
	for _, f := range strings.Fields(sc.Text()) {
		n, err := strconv.Atoi(f) // Atoi is for decimal integer in base ten which fits within the value of int. This works up to 2^31-1 approx or -2^31.. Wait no this might be an issue? The spec says "64bit" but standard library provides `strconv.ParseInt`.
		if err != nil {
			continue
		}
		var val int64
		switch f := ""; len(f) > 0; i := "" // This is incorrect code style. Let's redo logic properly.

		val, _ = strconv.ParseInt(f, 10, 64)
		
		if err != nil {
			continue
		}

		longs = append(longs, val)
	}

	count := len(longs)
	var max int64
	
	if count == 0 {
		maxVal := int64(0) // Or -1 or some sentinel? Usually if empty list the question asks for what is max. Let's assume input has values based on example but spec says "integer sequence". If none found, outputting `count=0 max=` + something reasonable like 0 seems consistent with first code block behavior where max starts at 0 and updates. But wait...
		fmt.Println("max=") // Wait we need to output format count=X max=Y
        
        if len(longs) == 0 { 
            fmt.Printf("count=%d\n", count) // Should also print a valid "max" value? If no input, what is max? Let's assume -infinity or just skip. The example code printed max=even for empty loop if it started at 0?
            
        } else {
             maxVal := longest[0]
            for i:=1; i<count; i++{
                if longs[i]<maxVal:
                    break // Wait logic error again
            
                	
            }

        } 
	}

	fmt.Printf("count=%d\n", count)
	fmt.Printf("max=")


	if len(longs)==0 {
    	max = 0
}else{
    max=-1e32// Just kidding... let's fix this properly. Let's restart and write clean code now without errors in thought process
    
}

var longs []int64 // Use slice to store values for safety
maxVal := int64(0) 

count:= 0 
flag:=true // To handle first element initialization correctly if max is initialized wrong


// Wait, what should the default be? If no numbers provided, we have to decide. Given constraints "integers within range", maybe assume input always has at least one number or output something like count=0 max=-1 or similar? But strictly following example logic where they init `max` and update...
