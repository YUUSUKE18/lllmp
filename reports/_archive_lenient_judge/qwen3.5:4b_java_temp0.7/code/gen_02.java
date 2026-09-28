import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 空行または空白のみを含む場合の処理
            if (line.trim().isEmpty() || " ".equals(line)) {
                System.out.println("count=0 sum=0");
                return;
            }

            BigInteger sum = new BigInteger(BigInteger.ZERO.toString());
            int count = 0;
            
            // セパレーターにカンマのみを指定し、文字列の各要素（整数として解釈可能）をチェックする
            String[] parts = line.split(",");
            
            for (String part : parts) {
                part = part.trim();
                
                if (!part.isEmpty()) {
                    try {
                        long value = Long.parseLong(part); // 64bit の範囲内と仮定して整数解析
                        
                        count++;
                        
                        BigInteger valBig = new BigInteger(String.valueOf(value));
                        sum = sum.add(valBig);
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視する
                    }
                } else if (" ".equals(part)) {
                    continue; 
                }
            }

            System.out.println("count=" + count + " sum=" + sum.toString());
        }
        
        scanner.close();
    }
}
