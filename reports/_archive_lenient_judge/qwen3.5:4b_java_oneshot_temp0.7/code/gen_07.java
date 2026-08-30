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

        Set<Integer> uniqueNumbers = new HashSet<>();
        long count = 0; // Total number of valid input integers found across all duplicates? No, re-read spec.
        
        /* 
         * Refined understanding of the problem based on "重複を除いた整数" (Integers with duplicates removed):
         * It asks for the statistics OF THE UNIQUE INTEGERS.
         * So: count = number of unique integers. sum = sum of those unique integers.
         */

        String[] tokens = line.trim().split(",");
        
        // We need to track which numbers have been seen and how many times they appear in total? 
        // Or just the set of unique numbers?
        // "重複を除いた整数について" -> Regarding integers with duplicates removed.
        // This implies we treat it as a Set of distinct values found in input.
        
        long sum = 0;
        int count = 0;
        boolean firstTokenFoundForSet = false;

        for (String token : tokens) {
            String trimmed = token.trim();
            if (!trimmed.isEmpty()) {
                try {
                    // We need to know the original value. But wait, does "count" mean 
                    // count of unique items or total occurrences? 
                    // Spec: "重複を除いた整数について、個数と合計を求めます。" -> For integers excluding duplicates, find count and sum.
                    // This strongly implies we are looking at the set {n | n exists in input}.
                    
                    int num = Integer.parseInt(trimmed);
                    uniqueNumbers.add(num);
                } catch (NumberFormatException e) {
                    // Ignore invalid elements as per spec: "整数として解釈できない要素も無視します"
                }
            }
        }

        count = 0; 
        sum = 0L; 
        
        for(int n : uniqueNumbers){
           count++;
           sum += n;
        }
        
         /* 
          * Wait, I should re-evaluate the parsing loop. The first pass added to Set but didn't calculate anything yet.
          * Let's rewrite cleanly in one go without intermediate variables if possible or just clean up logic.
          */

    // Resetting for clarity inside main block below:
}
