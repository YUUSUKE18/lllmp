import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) return;
        
        String line = scanner.nextLine();
        BigInteger sum = BigInteger.ZERO;
        int count = 0;
        
        // カンマ区切りで分割し、空白を除去して整数として解析
        for (String part : line.split(",")) {
            part = part.trim();
            if (!part.isEmpty()) {
                try {
                    long value = Long.parseLong(part);
                    sum.add(BigInteger.valueOf(value));
                    count++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない要素は無視
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum.toString());
    }
}
