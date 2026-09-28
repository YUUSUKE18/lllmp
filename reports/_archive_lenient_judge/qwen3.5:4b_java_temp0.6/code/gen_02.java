import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) return;
        
        String line = scanner.nextLine();
        String[] parts = line.split("\\s*,\\s*"); // 空白を含むカンマ区切り
        
        BigInteger sum = BigInteger.ZERO;
        int count = 0;
        
        for (String part : parts) {
            if (!part.isEmpty()) {
                try {
                    long value = Long.parseLong(part.trim());
                    sum.add(BigInteger.valueOf(value));
                    count++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視する
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum.toString());
    }
}
