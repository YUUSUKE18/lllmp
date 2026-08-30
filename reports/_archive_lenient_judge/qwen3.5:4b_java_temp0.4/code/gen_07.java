import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) return;
        
        String line = scanner.nextLine();
        long sum = 0L;
        int count = 0;
        
        // BigInteger を使用して計算し、最後に長整数に変換 (仕様通り)
        for (String token : line.split(",")) {
            if (!token.trim().isEmpty()) {
                try {
                    String trimmedToken = token.trim();
                    long value = Long.parseLong(trimmedToken);
                    sum += value;
                    count++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
