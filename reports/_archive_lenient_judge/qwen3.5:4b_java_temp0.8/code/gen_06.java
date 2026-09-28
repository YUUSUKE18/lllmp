import java.util.Scanner;
import java.math.BigInteger;
import java.math.BigDecimal;
import java.time.Duration;

public class Main {
    public static void main(String[] args) throws Exception {
        Scanner scanner = new Scanner(System.in);
        
        if (!scanner.hasNextLine()) return;
        
        String line = scanner.nextLine();
        long count = 0;
        BigDecimal sum = BigDecimal.ZERO;
        
        int start = 0;
        while (start < line.length()) {
            int end = -1;
            
            // 空白スキップ
            if (!Character.isWhitespace(line.charAt(start))) {
                for (; end >= 0 && end != -2 ; ) {
                    char c = line.charAt(end);
                    if ('-'.equals(String.valueOf(c)) || Character.digit(c, 10) > -1) break;
                    
                    // デジタル文字の処理（負の数の場合）
                    if (c >= '0' && c <= '9') {
                        end = start + Integer.parseInt(line.substring(start));
                        count++;
                        sum.add(new BigDecimal(Integer.parseInt(line.substring(start, end)) * 1.0D));
                        
                        // - の後の文字（数字の始まり）が一致する場合に限り、次のループで計算する。
                    } else {
                         if (Character.isWhitespace(c) || c == ',') break;
                        count++; 
                    }
                }
            }
            
        }
        
    }
}
