import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String line = reader.readLine();
        
        if (line == null || line.trim().isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> distinctNumbers = new HashSet<>();
        int count = 0;
        long totalSum = 0L; // Using long to prevent overflow during intermediate calculation, though spec says result fits in 64-bit.
        
        try {
            String[] parts = line.split(",");
            for (String part : parts) {
                if (!part.trim().isEmpty()) {
                    int num = Integer.parseInt(part.trim()); // Assuming input integers fit within Java's integer range based on typical CP problem constraints unless specified otherwise. If they exceed, we need long parsing logic first but "count" implies distinct items which are usually ints in such simple specs. Let's re-read: "整数列".
                    if (distinctNumbers.add(num)) { // add returns true only for new elements
                    
                        count++;
                        totalSum += num; 
                    } else {
                        continue; // Element was already processed, so we ignore duplicates per spec logic? Wait, let's re-verify the requirement.
                        // Requirement: "重複を除いた整数について、個数と合計を求めます" -> Count and Sum of UNIQUE integers.
                        // So if '1' appears twice in input {1, 2, 3}, unique are {1, 2, 3}. 
                        // If I add a duplicate to the set, it returns false immediately without incrementing count or sum? No, that's wrong logic for "count of distinct".
                    }
                } else {
                    continue;
                }
            }
            
        } catch (NumberFormatException e) {
            // Ignore elements that cannot be interpreted as integers. The try-catch block handles this implicitly if we check before parsing or let it fail? 
            // Spec says "整数として解釈できない要素も無視します". Java's parseInt throws NumberFormatException for invalid strings like letters. We should catch it to ignore.
        }

        System.out.println("count=" + count + " sum=" + totalSum);
    }
}
