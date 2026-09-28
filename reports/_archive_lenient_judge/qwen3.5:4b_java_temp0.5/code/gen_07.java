import java.util.Scanner;
import java.math.BigInteger;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        HashSet<Long> uniqueNumbers = new HashSet<>();
        
        while (scanner.hasNext()) {
            String token = scanner.next().trim();
            if (!token.isEmpty() && !isInteger(token)) {
                continue;
            }
            
            try {
                long num = Long.parseLong(token);
                uniqueNumbers.add(num);
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合は無視する
            }
        }
        
        int count = uniqueNumbers.size();
        BigInteger sum = new BigInteger("0");
        for (Long num : uniqueNumbers) {
            sum = sum.add(BigInteger.valueOf(num));
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }

    private static boolean isInteger(String token) {
        try {
            Long.parseLong(token.trim());
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
