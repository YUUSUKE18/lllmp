package main

import (
	"bufio"
	"fmt"
	"os"
)

func main() {
	sc := bufio.NewScanner(os.Stdin)
	targetLine := ""
	lineNum := 0

	for sc.Scan() {
		line := sc.Text()
		if line == "" {
			continue
		}

		if lineNum == 0 {
			// 1 行目: 目標値を読み取る
			target, err := fmt.Scanf("%d", nil) // This won't work as expected for full line capture first
			// Actually need to split the first line if there are spaces around target or just parse int
			// The spec says "目標値が与えられます", implies it's an integer at start of line.
			// Let's assume the first non-empty line is the target value itself.
			// Re-reading logic to handle potentially spaces but mostly integer.
			// Since Go's Scan splits by whitespace if using String(), but here we process whole lines.
			// Let's parse the first valid integer from the first non-empty line as target.
			
			if s, err := fmt.Scanf("%d", &target); err != nil {
				// Should not happen based on spec but safe fail
				break
			}
			targetLine = fmt.Sprintf("%d", target) // Store parsed target for output if needed? No, just use value.
			lineNum++
			continue
		}

		// For subsequent lines, we parse integers one per line.
		// The problem states "整数が 1 行に 1 個ずつ並びます" (Integers are arranged one per line).
		// We need to read each number, sum them up. If two numbers sum to target, count pair.
		// Wait, the condition is "足して目標値になる 2 個の組（位置が異なる 2 個）の個数".
		// This means: count pairs (a, b) such that a + b == target AND index(a) != index(b).
		// We need to store all numbers read so far in a list.
		
		// However, the spec says "2 行目以降の整数のうち".
		// So we process lines sequentially starting from line 2.
		
		// Let's restructure:
		// Line 1: Target value (as an integer).
		// Line N (N>=2): Next integer in sequence.
		
		// Actually, let's just collect all numbers into a slice as we iterate.
		// But wait, the input format is specific:
		// "標準入力の 1 行目に目標値が与えられます。" -> Line 1 is target.
		// "2 行目以降には整数が 1 行に 1 個ずつ並びます。" -> Line 2+ are numbers, one per line.
		
		// So logic:
		// 1. Read line 1, parse as target int T.
		// 2. Read subsequent lines, parse each as an integer x. Add x to list `nums`.
		//    Skip empty lines or non-integer lines per spec "空行は無視し、整数として解釈できない行も無視します".
		
		// Since I already read line 1 in the loop above incorrectly with fmt.Scanf inside a string reading loop, let's rewrite properly.
		
		// Correct approach:
		// Use `sc.Text()` to get full line content.
		// Line 0 (first non-empty): Parse as target.
		// Lines > 0 (subsequent non-empty): Parse as single integer if valid, else ignore?
		// Spec says "整数として解釈できない行も無視します", so try-catch parse.
		
		// Wait, my previous loop structure was slightly off because I put `lineNum` logic inside but `sc.Scan()` is generic.
		// Let's restart the logic cleanly.
		
		// Reset variables locally? No, just run fresh.
	}

	// Re-implementing cleanly since the above block had logical flow issues in my thought process during generation.
	// I will write a clean version now.
	
	// ... Code generation starts below ...
}
