import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNext()) {
            String line = scanner.nextLine();
            String[] parts = line.split(",");
            
            long sum = 0L;
            int count = 0;

            for (int i = 0; i < parts.length; i++) {
                try {
                    String trimmedPart = parts[i].trim();
                    if (!trimmedPart.isEmpty()) {
                        // Try to parse as integer. If it fails or is not a valid integer, ignore it per logic 'invalid elements are ignored'. 
                        // The spec implies skipping non-integers (e.g., "abc", 1a). StringTokenizer handles this naturally by treating delimiters differently but here we split manually.
                        // However, to be safe with numbers like 123a which might not parse correctly as a simple Integer.parseInt:
                        if (!trimmedPart.matches("-?\\d+")) {
                            continue; 
                        }

                        int val = Integer.parseInt(trimmedPart);
                        
                        // We need "unique integers" count. Using a Set to track seen values ensures uniqueness.
                        // But the requirement is "for each unique integer, get its count and sum". Wait: "それらのうち『重複を除いた整数』について、個数と合計を求めます。" 
                        // Interpretation A: For every distinct value x in input list, calculate (count of occurrences of x) + (sum of all elements == total_sum). 
                        // But usually this implies outputting per element? No, "1 行だけを出力します".
                        
                        // Re-reading spec carefully: 
                        // 「重複を除いた整数」について、個数と合計を求めます。
                        // If input is `1,2,3` (unique), count=3, sum=6. Output `count=3 sum=6`.
                        // Input `1,1,2,2` -> Unique integers are {1, 2}. 
                        // Does it mean "Count of unique numbers" and "Sum of unique numbers"? Or "Total occurrences" and "Total Sum"?
                        
                        // Standard interpretation for such tasks when asking for a single line output with count=... sum=...:
                        // It likely asks for the COUNT OF UNIQUE VALUES AND THE SUM OF THOSE UNIQVE VALUES. 
                        // OR The total number of items (after dedup) and their sum? No, "重複を除いた" modifies "整数". So we are looking at the set of unique integers found in input.
                        
                        // Let's assume: Calculate properties based on the Set of Unique Integers present in the list.
                        // i.e., For a set S = {distinct values}, output count(S) and sum(S). 
                        // This matches "count=3 sum=6" for 1,2,3 and would be weird if there were duplicates because dedup removes them from consideration entirely? 
                        // Wait. If input is `1,1`, unique integer is {1}. Count of unique integers = 1. Sum of those unique integers = 1.
                        
                        // Another possibility: "Count" refers to the number of elements in the list *after* deduplication (frequency sum?), no that's complex phrasing.
                        
                        // Let's look at similar competitive programming problems or typical logic puzzles. 
                        // Often, if asked for 'count' and 'sum' regarding a set of items after removing duplicates:
                        // 1. The value of N = number of distinct integers found.
                        // 2. The value of S = sum of those distinct integers.
                        
                        // Example Input: `5,5` -> Unique is {5}. Output: count=1, sum=5.
                        // Example Input: `5,10,5,10` -> Unique {5,10}. Count=2, Sum=15.
                        
                        // Alternative interpretation (less likely but possible): 
                        // "Remove duplicates from the sequence first", then count elements and sum them? That yields same result as Set approach above for simple lists. But if original is `1, 2`, dedup -> `1, 2`. Count=2 Sum=3. Same.
                        
                        // What about frequency distribution? Like: 1 (cnt 5), 2 (cnt 3). Output count=8 sum=? No that would require multiple lines or complex parsing unless it sums everything up anyway.
                        
                        // Given "count=<N> sum=<S>", N is almost certainly the size of unique elements, and S is their value sum.
                        
                        if (!seen.contains(val)) {
                            seen.add(val);
                            count++;
                            sum += val;
                        }
                    }
                } catch (NumberFormatException e) {
                    // Ignore non-integer strings like "abc" or "-1a" which fail parsing but might have matched regex? 
                    // The logic checks matches first. If regex fails, it continues to try parse. 
                    // Actually if input is 123xyz -> Integer.parseInt throws exception even though digits exist before X.
                    // Spec: "整数として解釈できない要素も無視します" (Ignore elements that cannot be interpreted as integers).
                    continue;
                }
            }

            System.out.println("count=" + count + " sum=" + sum);
        }
    }

    private static Set<Long> seen = new HashSet<>();
}
