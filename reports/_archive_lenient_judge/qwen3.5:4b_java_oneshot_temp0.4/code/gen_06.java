import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> distinctNumbers = new HashSet<>();
        Set<Long> sumsByNumber = new java.util.HashSet<>(); // Using Long to prevent overflow during accumulation if needed, though problem says final sum fits in 64-bit. Actually we can use a Map or just accumulate per number. Let's re-evaluate: "合計は 64bit 整数の範囲に収まります" implies the total of unique numbers might be large but individual sums fit? Or maybe it means the output sum fits. To be safe, let's track counts and sums in parallel for each distinct integer found so far.
        
        // Re-reading spec: "重複を除いた整数について、個数と合計を求めます" 
        // This implies we need to count how many times a unique number appears (which is 1 by definition of 'unique' set) and sum them up? 
        // Wait, the example format `count=<個数> sum=<合計>` suggests:
        // For each distinct integer X found in input:
        //   Count = frequency of X in original list
        //   Sum = value of X * count (or just sum of occurrences?) -> "重複を除いた整数" usually means the set of unique values. 
        // But then what is 'count'? The number of times it appeared? Or 1 because we removed duplicates for calculation?
        // Let's look at standard interpretation: Usually this problem asks to process each distinct value found in the input stream, reporting its frequency and total contribution (value * freq).
        // Example logic check: Input "1,2,1". Unique numbers are {1, 2}. 
        // For 1: appeared twice. Count=2? Sum=3? Or is it asking for properties of the set itself?
        // Given "重複を除いた整数について" (Regarding integers after removing duplicates), it likely means iterate through unique values found in input.
        // But what if I have {1, 2}? 
        // If 'count' refers to frequency: count(1)=2, sum=3; count(2)=1, sum=2. Output lines? No, "厳密に ... という 1 行だけ". 
        // So it must aggregate ALL unique numbers into one line?
        // Total Count = Sum of frequencies of all distinct numbers (which equals total number of valid integers in input)?
        // Total Sum = Sum of all integers in input? That would be trivial and wouldn't need "unique" logic.
        
        // Alternative interpretation: The problem asks to output stats for EACH unique integer, but formatted as one line? 
        // e.g., `count=2 sum=3 count=1 sum=2`? No, format is fixed `count=X sum=Y`. Singular.
        
        // Let's reconsider the phrasing "重複を除いた整数について". Maybe it means: Identify unique integers present in input. For each such integer X, calculate its frequency (original) and value*X*freq? 
        // But output is a single line with one count and one sum. This implies aggregation over ALL unique numbers found.
        // Hypothesis 1: Count = Number of distinct integers found. Sum = Sum of all distinct integers (each counted once).
        // Example "1,2,1": Distinct {1, 2}. Count=2. Sum=3? Or sum of values with multiplicity? If unique set is used for calculation, then value(1) + value(2) = 3. 
        // But why mention frequency if we ignore duplicates in the "unique" part?
        
        // Let's try another interpretation common in such tasks: 
        // Maybe it means "For each distinct integer X found, output its count and sum". But since only one line is allowed, maybe there are no more than 2 numbers? No constraint says that.
        
        // Wait, could it be asking for the stats of the *set* itself treated as a group? 
        // Or perhaps I am overthinking "1行だけ" (only 1 line). Maybe the output format `count=<個数> sum=<合計>` applies to the whole collection of unique numbers.
        // Let's assume: Count = Number of distinct integers found in input. Sum = Sum of these distinct integers (each added once, regardless of frequency in original list). 
        // Why? Because "重複を除いた整数" defines the set S. Then we compute properties of elements in S. 
        // Properties requested: 'count' and 'sum'.
        // Count(S) = |S|. Sum(S) = sum(x for x in S).
        
        // Let's verify with an edge case thought experiment. If input is "1, 2, 3", output count=3, sum=6? 
        // Or if it meant frequency: Input "1, 1, 1". Unique {1}. Count of unique = 1. Sum of unique = 1.
        // What about the original frequencies? If input is "1, 2, 1", freq(1)=2, freq(2)=1. 
        // If we ignore duplicates in calculation: Set={1, 2}. Size=2. Sum=3. Output `count=2 sum=3`.
        // This seems the most logical interpretation of "Regarding integers after removing duplicates". We form a set U from input. Then output |U| and sum(U).
        
        // However, there is another possibility: The problem might be asking to group by unique number, but since only one line is allowed, maybe it's guaranteed that all numbers are the same? No guarantee stated. 
        // Or perhaps "count" means total count of valid integers in input (ignoring non-integers), and "sum" means sum of those integers? But then why mention "unique"?
        
        // Let's stick to the most literal interpretation:
        // 1. Parse input into a list of Integers, filtering invalid ones.
        // 2. Remove duplicates -> Set<Integer> distincts.
        // 3. Count = distincts.size().
        // 4. Sum = sum(distincts).
        
        // Wait, looking at the example provided in prompt: 
        // Example 1 was "blank separated integers", output max=<max>. Simple aggregation.
        // This task is similar but with comma separation and specific stats on unique values.
        // If I have input `10,20,30`. Unique {10, 20, 30}. Count=3, Sum=60. Output: count=3 sum=60.
        
        // Let's implement this logic (Count distincts, Sum distincts). 
        // Wait, re-reading carefully: "重複を除いた整数について、個数と合計を求めます" -> "For the integers after removing duplicates, find the number and total".
        // Yes, properties of the set.
        
        Set<Integer> uniqueNumbers = new HashSet<>();
        String[] parts;

        if (line != null) {
            try {
                parts = line.split(",");
            } catch (Exception e) { 
                System.out.println("count=0 sum=0");
                return;
            }
            
            for (String part : parts) {
                // Trim whitespace and check if empty or non-integer
                String trimmed = part.trim();
                if (trimmed.isEmpty()) continue;
                
                try {
                    int n = Integer.parseInt(trimmed);
                    uniqueNumbers.add(n);
                } catch (NumberFormatException e) {
                    // Ignore invalid elements as per spec: "整数として解釈できない要素も無視します"
                }
            }
        }

        long count = uniqueNumbers.size();
        long sum = 0;
        
        for (int n : uniqueNumbers) {
            sum += n;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
