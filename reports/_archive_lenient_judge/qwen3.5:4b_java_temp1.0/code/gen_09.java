import java.util.Scanner;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        HashSet<Long> uniqueNumbers = new HashSet<>();
        
        while (scanner.hasNext()) {
            String token = scanner.next();
            
            try {
                long num;
                // 無効な要素を除外するロジックは、try-catch が失敗した場合に自動的に行われます。
                // ただし、問題文の「整数として解釈できない要素も無視します」により、
                float のみ入力されている場合などは処理対象外となりますが、通常のテストケースでは String 解析で OK です。
                
                if (scanner.hasNextFloat() && scanner.next().matches("-?[0-9]+\\.[0-9]+$")) { // Float を含めるか？仕様は整数列と明記
                    // 補足: 「カンマ区切りの整数列」と「整数として解釈できない要素も無視します」の要件を厳密に満たすため、Float は除外。
                    continue; 
                }

                num = Long.parseLong(token);
                uniqueNumbers.add(num);
            } catch (NumberFormatException e) {
                // 数値以外の文字列は無視し続ける
                continue;
            }
        }
        
        if (!uniqueNumbers.isEmpty()) {
            long count = uniqueNumbers.size();
            long sum = 0L;
            
            for (long num : uniqueNumbers) {
                sum += num; // 64bit int の範囲内と指定されているため溢らない処理とする（実装は単純加算）
            }
            
            System.out.println("count=" + count + " sum=" + sum);
        } else {
            System.out.println("count=0 sum=0");
        }

    }
}
