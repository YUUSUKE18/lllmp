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
        long totalSum = 0L;
        int count = 0;
        
        String[] parts = line.split(",");
        for (String part : parts) {
            if (!part.isEmpty() && Integer.parseInt(part.trim()) != null) { // Handle potential non-integer or empty strings gracefully by parsing attempt within logic below, but spec says ignore unparseable. Actually, try-catch is safer per example style logic implied. Let's re-read: "整数として解釈できない要素も無視します".
                int num;
                try {
                    String trimmed = part.trim();
                    if (trimmed.isEmpty()) continue;
                    num = Integer.parseInt(trimmed);
                    
                    // Since we need count of distinct numbers, and sum over those distinct numbers? 
                    // Wait: "重複を除いた整数'について、個数と合計を求めます" -> Count how many unique integers there are. Sum is the sum of these unique integers (not duplicates).
                    if (!distinctNumbers.add(num)) {
                        totalSum -= num; // Remove previous addition for this number since it was already counted once now we found a duplicate? No, Set.add returns false only on new element being added to existing set logic in my head. Let's fix: Use distinctSet directly.
                    } else {
                        totalSum += num;
                        count++;
                    }
                } catch (NumberFormatException e) {
                    // Ignore unparseable elements as per spec
                }
            }
        }

        System.out.println("count=" + count + " sum=" + totalSum);
    }
}
