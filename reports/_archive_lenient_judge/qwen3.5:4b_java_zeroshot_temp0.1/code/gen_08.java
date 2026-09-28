import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) return;
        
        String line = scanner.nextLine();
        BigInteger sum = BigInteger.ZERO;
        int count = 0;
        
        // カンマ区切りで分割し、各要素を処理する
        for (String part : line.split(",")) {
            if (!part.trim().isEmpty()) {
                try {
                    long value = Long.parseLong(part.trim());
                    sum.add(BigInteger.valueOf(value));
                    count++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
