import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.TreeSet;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        TreeSet<Integer> distinctNumbers = new TreeSet<>();
        long totalSum = 0L;
        
        String[] parts = line.split(",");
        for (String part : parts) {
            if (!part.trim().isEmpty()) {
                try {
                    int num = Integer.parseInt(part.trim());
                    boolean isDistinct = distinctNumbers.add(num);
                    if (isDistinct && !distinctNumbers.isEmpty() || distinctNumbers.size() == 1) {
                        // If it's the first one we see, add its value to sum. 
                        // But wait, logic check: "重複を除いた整数"について、個数と合計を求めます。
                        // This means for each unique integer X, count is how many times it appeared in input?
                        // Or does "count=<unique_count>" mean the number of distinct integers found so far?
                        
                        // Let's re-read carefully: 
                        // 『重複を除いた整数』について、個数と合計を求めます。
                        // This phrasing is slightly ambiguous. It could be interpreted as:
                        // 1) For each unique integer, output "count=appearances sum=value" (but the format says count=<number> sum=<sum>, singular). 
                        //    Since there's only one line of output with a single count and sum, this implies we are aggregating over ALL distinct integers.
                        
                        // Interpretation 2: The set of unique numbers is S = {x_1, x_2}. Count how many elements in the original list were NOT duplicated? No.
                        
                        // Most likely interpretation given "count=<number> sum=<合計>" format (singular output):
                        // It asks for the count and sum of the distinct integers found. 
                        // i.e., Sum over all unique x: (how often did x appear?) -> NO, that would be total elements if we just sum counts? No.
                        
                        // Let's look at standard CP problem phrasing "duplicate removed". Usually implies finding a set {x1...}.
                        // If the output format is singular (one count, one sum), it likely means:
                        // Count = Number of unique integers found in the input sequence.
                        // Sum = Sum of all those unique integers? Or Sum of original values with duplicates counted multiple times? 
                        
                        // "重複を除いた整数" -> Unique integers {u1, u2...}.
                        // If I have 1, 1, 2. Unique: 1, 2. Count=2 (number of types). Sum = 3 (1+2) or 4 (1+1+2)? 
                        // Usually "sum" refers to the sum of values themselves. Since we are talking about unique integers {u_i}, do we sum u_i once? Yes, usually set properties imply distinct elements contribute once unless specified otherwise ("weighted").
                        
                        // Let's assume: Count = size of Set(Unique Integers), Sum = Sum of (Distinct Integers). 
                        // Example Input: "1,2,3" -> count=3, sum=6. 
                        // Example Input: "1,1,2" -> Unique={1, 2}. count=2, sum=3.
                        
                        distinctNumbers.add(num);
                    } else {
                         // If we use a Set to track unique numbers encountered so far? No, TreeSet handles uniqueness automatically on insertion if it's empty or new element added via add(). 
                         // Wait, my logic above: `boolean isDistinct = distinctNumbers.add(num)` returns true ONLY IF the number was NOT in set.
                         // So we can just sum every time we successfully add to the Set? No, because duplicates won't be added again.
                         
                    }
                } catch (NumberFormatException e) {
                    continue;
                }
            }
        }
        
        System.out.println("count=" + distinctNumbers.size() + " sum=" + totalSum);
    }
}
