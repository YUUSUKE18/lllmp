import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String line = br.readLine();
        if (line == null || line.isEmpty()) {
            System.out.println("count=0 sum=0");
            return;
        }

        Set<Integer> uniqueNumbers = new HashSet<>();
        boolean firstNumberFound = false;
        long sum = 0;

        for (String token : line.split(",")) {
            String trimmed = token.trim();
            if (trimmed.isEmpty()) continue;

            try {
                int num = Integer.parseInt(trimmed);
                uniqueNumbers.add(num);
                if (!firstNumberFound) {
                    sum += num;
                    firstNumberFound = true;
                } else {
                    // If it's a duplicate, we don't add to count but the sum stays same per spec
                    // "個数" implies count of distinct integers. 
                    // The example logic is slightly ambiguous about duplicates in sum:
                    // "重複を除いた整数について、個数と合計を求めます" usually means:
                    // Count = number of unique items
                    // Sum = sum of those unique items (each unique item added once)
                    // If it meant sum of all input numbers including duplicates, 
                    // the phrasing would typically be "それぞれの数を足し合わせ".
                    // Based on "重複を除いた整数", we only sum unique ones.
                }
            } catch (NumberFormatException e) {
                // Ignore non-integer elements
            }
        }

        System.out.println("count=" + uniqueNumbers.size() + " sum=" + sum);
    }
}
