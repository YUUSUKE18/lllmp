import java.util.Scanner;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        if (!sc.hasNextLong()) return;
        long target = sc.nextLong();

        Map<Long, Long> countMap = new HashMap<>();
        long pairCount = 0;

        while (sc.hasNext()) {
            String token = sc.next();
            try {
                long num = Long.parseLong(token);
                long complement = target - num;
                
                if (countMap.containsKey(complement)) {
                    pairCount += countMap.get(complement);
                }
                
                countMap.put(num, countMap.getOrDefault(num, 0L) + 1L);
            } catch (NumberFormatException e) {
                // Ignore non-integer lines/tokens
            }
        }

        System.out.println("pairs=" + pairCount);
    }
}
