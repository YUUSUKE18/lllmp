import java.util.Scanner;
import java.math.BigInteger;
import java.util.HashSet;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) return;
        
        String line = scanner.nextLine();
        Set<Long> distinctNumbers = new HashSet<>();
        
        for (String token : line.split(",")) {
            try {
                long num = Long.parseLong(token.trim());
                distinctNumbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
            }
        }
        
        int count = distinctNumbers.size();
        BigInteger sum = new BigInteger("0");
        for (long num : distinctNumbers) {
            sum = sum.add(BigInteger.valueOf(num));
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
