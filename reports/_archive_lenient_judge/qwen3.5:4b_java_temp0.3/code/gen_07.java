import java.util.Scanner;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> uniqueNumbers = new HashSet<>();
        
        while (scanner.hasNext()) {
            String token = scanner.next();
            try {
                int number = Integer.parseInt(token.trim());
                if (!uniqueNumbers.add(number)) {
                    continue; // Already added, skip processing for sum logic below as we need unique count and total of uniques. 
                              // Wait, re-reading spec: "重複を除いた整数"について、個数と合計を求めます。
                              // This means: Count how many UNIQUE integers there are? Or Sum the values of those unique integers?
                              // Usually it implies: For each distinct integer value X present in input: count=1, sum=X. 
                              // But "重複を除いた整数" suggests we consider only the set of numbers.
                              // Let's interpret as: Calculate total number of distinct elements and their sum.
                    continue;
                } else {
                     uniqueNumbers.add(number);
                }
            } catch (NumberFormatException e) {
                // Ignore non-integer tokens
            }
        }

        int count = 0;
        long sum = 0L;
        
        for (int num : uniqueNumbers) {
            count++;
            sum += num;
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}

// Note: HashSet needs import java.util.HashSet. 
// The above code has a logical flaw in the loop for counting unique items if we just iterate at end.
// Let's rewrite cleanly without logic errors.
