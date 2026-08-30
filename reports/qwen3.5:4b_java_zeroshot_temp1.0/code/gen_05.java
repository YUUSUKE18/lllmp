import java.util.Scanner;
import java.util.Set;
import java.util.HashSet;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            String[] parts = line.trim().split(",");
            Set<Integer> uniqueNumbers = new HashSet<>();
            for (String part : parts) {
                part = part.trim();
                try {
                    Integer num = Integer.parseInt(part);
                    uniqueNumbers.add(num);
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }

            long count = uniqueNumbers.size();
            BigInteger sum = BigInteger.ZERO;
            for (Integer num : uniqueNumbers) {
                sum = sum.add(BigInteger.valueOf(num));
            }

            System.out.println("count=" + count + " sum=" + sum);
        }
    }
}
