import java.util.Scanner;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> uniqueIntegers = new HashSet<>();
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (!line.isEmpty()) {
                String[] parts = line.split(",");
                for (String part : parts) {
                    part = part.trim();
                    try {
                        long numVal = Long.parseLong(part);
                        uniqueIntegers.add((int)numVal); // 64bit int range fits in Java's int if strictly within [-2^31, 2^31-1], but spec says sum fits in 64-bit. Re-evaluating: individual integers might be up to 2^30 so they fit in short/char? No, "integer" usually implies standard integer range unless specified. However, if the *sum* is guaranteed to be within 64-bit signed int range, and we treat inputs as long (to prevent overflow during parsing) then cast back or sum using long.
                        // Actually, let's re-read carefully: "合計は 64bit 整数の範囲に収まります" -> Sum fits in Long.MAX_VALUE roughly? Or Java int (32-bit)? 
                        // Usually "64bit integer" implies range of -9e18 to +9e18. So we should use long for storage and sum calculation just in case individual elements exceed 32-bit but total doesn't? No, usually input integers are standard ints unless specified otherwise.
                        // Wait, spec says "整数列". If I assume they can be large numbers (up to ~6e18) but their count is small so the *sum* fits in long...
                        // Safest approach: Use HashSet<Long> to store unique values and Long for sum accumulation logic? 
                        // Actually simplest interpretation: parse as long, add to list if not duplicate. But wait "unique integers". If I use a Set of Strings then tryParse each string -> that's safer than assuming input fits in Int or Long unless specified input type constraint other than result constraint.
                        
                         // Re-think based on Java primitive int being the default for 'int' keyword but spec says 64bit sum limit which suggests intermediate sums could exceed 32-bit if individual values were large? 
                         // Actually, if all inputs are within standard integer range (e.g., -10^9 to 10^9) and we have many of them.
                         // Let's parse as Long to be safe for "integer" interpretation that might exceed signed 32-bit but still result in a valid sum fitting into 64-bit long? 
                         // Or maybe the inputs are just standard integers (-2B..+2B). Given it says "整数", usually implies standard int. But if input was -10^9 and count is 5*10^7, sum would be ~-5*10^16 which fits in Long but overflows Int (max ~2*10^9).
                         // To satisfy the condition "sum fits in 64bit integer", we should accumulate using a variable capable of holding that range. 
                         
                        long val = Long.parseLong(part);
                        
                    } catch (NumberFormatException e) {
                        continue; // Ignore elements not interpretable as integers
                    }
                }
            } else {
               break; // Stop if empty line encountered at end? Actually loop handles trailing newlines naturally with trim(). 
                  // Wait, the spec says "standard input... comma separated integer list". It doesn't explicitly say multiple lines are allowed in one run as separate inputs or just a single stream of tokens across lines.
                  // Usually competitive programming style: read all available data until EOF. Scanner's hasNextLine() loop is safe if we process each line. 
               continue; // Or break? If empty line, likely trailing newline. Better to ignore and proceed or stop processing that specific part but keep going for valid input parts? 
            }
        }

        long sum = 0L;
        // Wait! The logic above is flawed: I need the count of unique integers AND their SUM.
        // My previous loop parsed into a Set, which counts UNIQUE elements correctly if I add each time it's seen for first time? No, HashSet stores unique automatically. 
        // So `uniqueIntegers.size()` is exactly what we want as 'count'. 
        // And the sum of these UNIQUE integers must be calculated.
        
        long totalSum = 0L;
        // Wait, I cannot calculate sum inside the loop easily without storing them first or adding to a separate accumulator set/list?
        // Better: Use HashSet<Long> uniqueSet. Iterate over it later to compute sum and count. 
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> integers = new HashSet<>(); // Assuming inputs fit in Integer range? Or Long?
                                                // Spec says "Sum fits in 64bit". If individual items are Int, they sum to potentially >32-bit. 
                                                // To be safe against large integer inputs (e.g. close to 10^9 but not exceeding), using Set<Integer> is risky if input can exceed Integer.MAX_VALUE?
                                                // But "integers" usually means Java `long` in such contexts unless specified as `short`. Let's use Long for safety of individual elements, since sum constraint only applies to the result.
        HashSet<Long> uniqueNumbers = new HashSet<>();

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine().trim();
            if (!line.isEmpty()) {
                // Process each token in the line by splitting on comma? Or just split whitespace/newlines first then commas? 
                // "カンマ区切りの整数列" -> Comma separated list. It could be one big string or multiple lines containing parts of it.
                String[] items = line.split(",");
                for (String item : items) {
                    try {
                        long val = Long.parseLong(item.trim());
                        uniqueNumbers.add(val); // HashSet handles duplicates automatically
                    } catch (NumberFormatException e) {
                        continue; // Ignore non-integers
                    }
                }
            } else if (scanner.hasNextLine()) { 
                 // If line is empty, should we break? Or just skip it as whitespace/empty element is ignored. 
                 // Spec: "空要素・前後の空白は無視". So skipping empty lines is fine. 
            }
        }

        long count = uniqueNumbers.size();
        long sum = 0L;
        
        for (long num : uniqueNumbers) {
            if (num != null) { // Should not happen but safe check
                sum += num;
            } else break; 
            // Wait, HashSet iteration does NOT support removing elements? No need to remove. Just iterate and add.
            // Actually, iterating a Set is fine here. But wait! I am adding duplicates via `uniqueNumbers.add(val)`. That's the definition of "重複を除いた". 
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
