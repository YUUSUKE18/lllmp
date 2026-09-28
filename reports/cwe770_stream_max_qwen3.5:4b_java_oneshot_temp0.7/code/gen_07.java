import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        long count = 0;
        long maxVal = Long.MIN_VALUE; // Default value, though logic handles first element
        
        if (line != null && !line.isEmpty()) {
            StringTokenizer st = new StringTokenizer(line);
            
            while (st.hasMoreTokens()) {
                String token = st.nextToken();
                
                try {
                    long val = Long.parseLong(token.trim());
                    
                    count++;
                    
                    // Initialize max with the first valid number or keep existing if larger
                    if (count == 1) {
                        maxVal = val;
                    } else {
                        if (val > maxVal) {
                            maxVal = val;
                        }
                    }
                } catch (NumberFormatException e) {
                    // Ignore non-integer tokens as per spec "整数として解釈できない要素も無視します"
                }
            }
        } else {
            // If input is null or empty, count remains 0. 
            // maxVal should logically not be used if count is 0, but format requires outputting it?
            // Based on spec "count=<個数> max=<最大値>", we must output something for both fields even if list is empty?
            // However, usually in such problems with an empty input of valid integers:
            // The prompt says "受け取ります" (receives). If no numbers are received.
            // Let's assume standard behavior: count=0 and max should probably be 0 or undefined. 
            // Given the example output format implies values always exist, but for robustness with empty input:
            // We'll stick to initializing maxVal carefully. But if there are NO integers, what is the max?
            // The problem says "値は 64bit 整数の範囲に収まる" (values fit in range), implying valid inputs exist or handle gracefully.
            // If no numbers found: count=0. For max, let's assume it defaults to something reasonable if forced, 
            // but strictly speaking undefined. However, the example code outputs `max=<value>`.
            // Let's set a flag to track if we have initialized anything. But simpler logic for competitive programming style:
            // If no valid ints found, maxVal remains Long.MIN_VALUE? Or should it be 0? 
            // The prompt doesn't specify behavior for empty input explicitly other than ignoring non-integers.
            // Let's assume at least one integer exists or we output a placeholder if forced to have values in the string format.
            // Actually, looking at the example code: `int max = 0;` and it outputs that regardless of finding numbers (unless logic changes). 
            // My revised logic ensures initialization only on first valid number found? No, usually `max=0` is safe if inputs are positive or non-negative.
            // But integers can be negative. So initializing to Long.MIN_VALUE is better.
            
            // Re-reading spec: "それらの『要素数』と『最大値』を求めます" (Find the count and max of those). 
            // If there are no numbers, what is the max? Mathematically undefined or empty set.
            // But to strictly follow `count=<k> max=<v>` format:
            // I will initialize `maxVal` only if at least one number exists found. 
            // However, Java's `Long.MIN_VALUE` is safe as a default "identity" for MAX if we assume non-empty input logic usually implied by such tasks?
            // Wait, the example code initializes `int max = 0`. If all inputs are negative (-5), it outputs `-5`, not `0`. 
            // So I should initialize with Long.MIN_VALUE. If count is 0, then output might be weird (max=Long.MIN_VALUE?). 
            // Let's assume input will contain at least one integer based on "受け取ります" implying a list of numbers to process.
        }

        if (count == 0) {
            System.out.println("count=" + count + " max=0");
        } else {
            System.out.println("count=" + count + " max=" + maxVal);
        }
    }
}
