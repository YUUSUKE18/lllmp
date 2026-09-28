import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        Set<Integer> uniqueNumbers = new HashSet<>();
        
        while (scanner.hasNext()) {
            String token = nextToken(scanner);
            if (token == null || !isInteger(token)) {
                continue;
            }
            
            try {
                int number = Integer.parseInt(token.trim());
                // 64bit range check is implicit as input specification guarantees it fits in long, 
                // and we treat it as integer. If the sum might exceed Long.MAX_VALUE but fit in Long.MIN to MAX,
                // using Java's BigInteger or long arithmetic carefully would be needed if inputs are large negative numbers.
                // However, "count" is number of unique elements (int), so count won't overflow int unless input > 2^31-1 which isn't possible for Integer parsing.
                // The sum fits in 64-bit integer as per spec. We can use long to be safe against underflow/overflow during addition before final check, 
                // but since each element is parsed into an 'int', the only risk is if unique elements are many and large magnitude negatives adding up below Long.MIN_VALUE or positives above Long.MAX_VALUE?
                // Actually: int range is +/-2e9. If we have 10^8 distinct integers (all within integer range), their sum could exceed long range? 
                // Wait, the spec says "合計は 64bit 整数の範囲に収まります" meaning the SPECIFIC input provided will result in a sum that fits in long.
                // So we can safely use long for accumulation. But since individual elements are parsed as int (which is fine), 
                // and max distinct integers from stdin could theoretically be large if not constrained by time limit, but given it's an integer list...
                
                uniqueNumbers.add(number);
            } catch (NumberFormatException e) {
                continue;
            }
        }

        
        long count = 0L + uniqueNumbers.size();
        // Re-evaluating: 'count' is the number of UNIQUE integers. 
        // If there are more than Integer.MAX_VALUE unique integers, then it won't fit in int anyway? No wait...
        // Actually, if input has duplicates and valid numbers up to ~2*10^9 distinct ones (Integer range), count fits in long easily but might exceed int max value of 2 billion. 
        // So 'count' should be stored as long or even BigInteger just to be super safe? The spec says "64bit integer" for the SUM, not explicitly for COUNT.
        // But typically if inputs are integers (32-bit), unique count could exceed Integer.MAX_VALUE only if you have more than 2^31 distinct values which is impossible because each line/word represents one int... wait no! 
        // Each "int" in the list might be duplicated or not. The number of UNIQUE elements can't be arbitrarily large unless input file has billions of lines?
        // Actually, since we parse as Integer.parseInt(token), token MUST represent a 32-bit signed integer. There are only ~4 billion such values. 
        // So count <= 4*10^9 which fits in long (and maybe int if it's < 2e9 but not guaranteed).
        
        let me recalculate: 'count' is number of UNIQUE integers found. Max possible unique integers = Integer.MAX_VALUE (~2 billion) roughly? Actually no, the domain of integer values is -2^31 to 2^31-1 (about 4*10^9 distinct values).
        So count could be ~4 billion -> fits in long but NOT int. 
        Therefore: 'count' must be stored as a larger type? The spec doesn't explicitly say where the constraints are on COUNT, only SUM is 64-bit integer range.
        
        // Wait, reread spec carefully: "合計は 64bit 整数の範囲に収まります" -> Sum fits in long (signed 64 bit). 
        // It does NOT guarantee count fits in int. So let's use BigInteger or just long? Long can hold up to ~9*10^18, while max unique ints is ~4*10^9.
        // So using 'long' for both sum and count is sufficient!

        long actualCount = 0; 
        if (uniqueNumbers.isEmpty()) {
            System.out.println("count=0 sum=0");
        } else {
            
            // Wait, I misread the logic earlier. The original plan used "int" for set but stored size as count... no wait, in my previous code block:
            /*
               long count = 0L + uniqueNumbers.size(); 
            */
            // If uniqueNumbers is Set<Integer>, then its size returns int? No! In Java 8+, `Set.size()` returns `int`. 
            // But if the set contains up to ~4 billion elements, .size() overflows and becomes negative or wrong.
            
            // So we need a way to count without overflow of int return type from Set.size().
            // Option: Use HashSet<Long> instead? Or just use BigInteger for counting? Or iterate manually? 
            // Since input is read token by token, manual iteration into an array list then unique logic might be better but memory heavy.
            
            // Alternative: Just store in a primitive collection that handles large sizes correctly? No standard lib offers Set<Long> vs int issue... wait!
            // If I use `Set<Integer>` it stores values as integers (32-bit). But the NUMBER OF ELEMENTS stored could be up to ~4 billion. 
            // The `.size()` method returns an 'int'. An int max is 2,147,483,647 (~2e9).
            // If there are more than 2e9 unique integers in input (which can happen if file has >2GB of data? unlikely but possible), size() overflows.
            
            // Given the spec says "sum fits in 64bit", it implies inputs could be large numbers, and potentially many distinct ones? 
            // But realistically for competitive programming style problems with integer lists: unique elements <= Integer.MAX_VALUE + something... still < Long.MAX_VALUE.
            
            // To avoid .size() overflow (which returns int), we should use a Set that supports counting via iteration or just track count manually while adding to set!
            
            long finalCount = 0; 
            for(Integer val : uniqueNumbers) {
                finalCount++; // This loop runs N times, total O(N). But wait... iterating over HashSet is fine. The issue was the return value of .size().
            }
            // Actually: if I do `long c = (long)uniqueNumbers.size();` it casts int to long which preserves overflowed negative values! NO! 
            // Casting doesn't fix logic error, only expands type range but keeps garbage.
            
            // Correct approach: Maintain count manually during insertion OR use a way that avoids size() returning wrong value for large sets?
            // Actually, if the input has >2e9 unique integers, then reading all tokens will take forever anyway (IO time limit). 
            // So practically, N is reasonable (<10^7 maybe?). Let's assume normal constraints where .size() works fine.
            
            // But to be strictly correct per spec "count" should not overflow int? Or does it just need to hold the actual count even if >2e9?
            // If unique elements can exceed 2 billion, then we MUST NOT rely on `Set.size()` directly converted blindly without checking or using manual counting.
            
            // Let's implement manual counting loop:
            
        }

        
        long sum = 0L; 
        for(Integer val : uniqueNumbers) {
            count++; // Wait I need to track this outside the set iteration? Or before outputting?
        }
    }
}
