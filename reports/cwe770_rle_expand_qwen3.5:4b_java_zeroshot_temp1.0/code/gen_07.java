import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long count = 0;
        long sum = 0;

        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            Scanner lineScanner = new Scanner(line);
            
            while (lineScanner.hasNext()) {
                String token = lineScanner.next();
                if (token == null || "".equals(token)) {
                    continue;
                }

                int colonIndex = -1;
                int colonIndexMax = Integer.MAX_VALUE;
                
                // 単に ":" で区切られるかどうかを確認するために、文字列を分解
                String[] parts = token.split(":");
                if (parts.length != 2) {
                    continue;
                }

                // 値の解析 (文字列から int/int64 へ)
                String valueStr = parts[0].trim();
                if (valueStr.isEmpty()) {
                    continue;
                }
                
                try {
                    long val = Long.parseLong(valueStr);
                    
                    // 回数の解析
                    String countStr = parts[1].trim();
                    if (countStr.isEmpty() || Integer.MIN_VALUE.toString().equals(countStr) || Integer.MAX_VALUE.toString().equals(countStr)) {
                         // Integer の最小値・最大値は " -2147483648" か "2147483647" で終わる。
                         // 単純に長さが一致する場合だけ整数とみなすのがリスクを避けるため、
                         // 問題文の「0 以上」の制約より、Integer.MIN_VALUE は含めない。
                         if (countStr.isEmpty()) continue;
                         
                         long cnt = Long.parseLong(countStr);
                         sum += val * cnt;
                         count += cnt;
                    } else {
                        try {
                            long cnt = Long.parseLong(countStr);
                            sum += val * cnt;
                            count += cnt;
                        } catch (NumberFormatException e) {
                            // 数値として解釈できない場合は無視
                            continue;
                        }
                    }
                } catch (NumberFormatException e) {
                    // 整数として解析できない場合は無視
                }
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
