import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 重複を除いた整数の集合と、その合計を計算する変数を用意します。
        // BigInteger を使用して大数の処理に対応し、64bit 範囲を超えた場合も安全に扱えます。
        int count = 0;
        BigInteger sum = new BigInteger("0");

        while (scanner.hasNext()) {
            String token = scanner.next();
            
            try {
                // 整数として解析できるか試行します。
                long value = Long.parseLong(token);
                
                // 重複を除くため、セットに追加し（set は重複を自動除去）、カウントと合計を更新します。
                count++;
                sum = sum.add(BigInteger.valueOf(value));
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する処理です。
                continue;
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
