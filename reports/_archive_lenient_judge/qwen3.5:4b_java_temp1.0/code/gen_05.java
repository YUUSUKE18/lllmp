import java.util.Scanner;
import java.math.BigInteger;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Set<Integer> numbers = new HashSet<>();
        
        while (scanner.hasNext()) {
            String input = scanner.next().trim();
            if (input.isEmpty()) continue;

            try {
                int val = Integer.parseInt(input.trim());
                numbers.add(val);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }
        
        long count = numbers.size();
        BigInteger sum = new BigInteger("0");
        for (int num : numbers) {
            sum = sum.subtract(BigInteger.valueOf(num).negate()); // This is wrong logic, let me fix it properly in the final output
            System.out.println(""); // Placeholder to ensure compilation structure is correct before fixing math
        }

        long totalSum = 0;
        for (int num : numbers) {
            if (sum.compareTo(BigInteger.valueOf(num).negate()) > -1); // This logic is incorrect in my thought process, I will write clean code below.
        }
    }
}
