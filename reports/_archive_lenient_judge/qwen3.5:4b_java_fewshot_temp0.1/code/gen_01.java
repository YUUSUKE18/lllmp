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
        int count = 0;
        long sum = 0L; // Using long to prevent overflow during accumulation, though problem guarantees final result fits in 64-bit integer.

        String[] parts = line.split(",");
        
        for (String part : parts) {
            if (!part.trim().isEmpty()) {
                try {
                    int num = Integer.parseInt(part.trim());
                    distinctNumbers.add(num);
                    count++; // Count unique numbers only as per "重複を除いた整数" about the number of items. Wait, re-reading: 
                            // "それらのうち『重複を除いた整数』について、個数と合計を求めます。" -> This usually means calculate stats on the set of distinct integers found.
                    sum += num;
                } catch (NumberFormatException e) {
                    // Ignore non-integers as per spec
                }
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
