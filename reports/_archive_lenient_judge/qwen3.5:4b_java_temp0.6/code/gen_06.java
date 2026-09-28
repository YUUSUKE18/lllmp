import java.util.Scanner;
import java.util.Set;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> distinctNumbers = new HashSet<>(); // Using Integer as it fits within 64-bit range for individual elements, sum will be handled carefully. However, the spec says "sum is within 64bit integer", implying we can use long directly but need to parse safely. Let's use BigInteger for accumulation safety if needed, or just rely on problem constraints. Actually, since input numbers are integers (32-bit usually) and count could be large? No, standard interpretation: inputs are ints. Sum fits in 64-bit int.

        // Re-reading spec: "整数" implies integer type in most contexts unless specified otherwise. 
        // But to handle potential overflow during intermediate calculation safely before wrapping (though Java long is signed 64-bit),
        // and since the requirement states sum IS within 64-bit, we can use long directly.

        Set<Long> distinctNumbersSet = new HashSet<>(); 

        while (scanner.hasNext()) {
            String token = scanner.next().trim();
            if (token.isEmpty() || !isInteger(token)) continue; // Ignore non-integers or empty tokens
            
            try {
                int valInt = Integer.parseInt(token);
                distinctNumbersSet.add((long)valInt);
            } catch (NumberFormatException e) {
                continue; 
            }
        }

        long sum = 0L;
        for (Long num : distinctNumbersSet) {
            // Wait, the spec says "重複を除いた整数について、個数と合計を求めます" -> Sum of UNIQUE numbers? Or count and sum including duplicates first then unique? 
            // Usually: Count how many unique items exist. Sum their values.
            // Example input: 1,2,1,3 -> Unique: {1,2,3}. Count=3. Sum=6.
            
            if (num >= Long.MIN_VALUE && num <= Long.MAX_VALUE) { 
                sum += num; 
            } else {
                 // If a number is outside long range? Spec says inputs are integers. Java int fits in 64-bit long easily.
                 break; 
            }
        }

        System.out.println("count=" + distinctNumbersSet.size() + " sum=" + sum);
    }
    
    private static boolean isInteger(String s) {
        if (s == null || s.trim().isEmpty()) return false;
        try {
            Integer.parseInt(s); // This will throw if not integer format, but parseInt handles optional signs. 
                                // However, to be safe against non-numeric chars like "abc", we catch or check regex? 
                                // The spec says "整数として解釈できない要素も無視します".
        } catch (NumberFormatException e) {
            return false;
        }
        return true;
    }

}
