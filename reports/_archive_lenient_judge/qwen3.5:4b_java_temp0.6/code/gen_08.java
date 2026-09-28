import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        BigInteger totalSum = BigInteger.ZERO;
        int countDistinctValues = 0;
        
        if (scanner.hasNextLine()) {
            String inputLine = scanner.nextLine();
            
            // 空行や空白のみを含む場合は処理を終了
            if (inputLine.trim().isEmpty() || !inputLine.contains(",")) {
                return;
            }

            String[] parts = inputLine.split(",");
            
            for (String part : parts) {
                part = part.trim(); // 前後の空白を削除
                
                try {
                    long value = Long.parseLong(part);
                    
                    if (value != totalSum.longValue()) { // ここでの比較は単純な数値チェックのため、実際には Set を使うべきだが要件に即して実装する。再考: 重複を除くため Set が適切。
                        // 上記のロジックが複雑なので、Set で一意性を管理し、合計を計算するアプローチに変更
                    }
                } catch (NumberFormatException e) {
                    continue; // 整数として解釈できない要素は無視
                }
            }
        }

        // Set を使って重複を除く
        java.util.Set<Long> distinctValues = new java.util.HashSet<>();
        
        if (scanner.hasNextLine()) {
            String inputLine = scanner.nextLine();
            
            if (!inputLine.trim().isEmpty() && !inputLine.contains(",")) {
                return; // 空要素・空白のみや、区切りがない場合の扱い。要件に照らして出力しないか？「整数列」とあるが、形式が不明確な場合は処理を抜くのが安全。ただし通常は入力があることを前提とする。ここでは Set に挿入するロジックを実装する。
            }

            String[] parts = inputLine.split(",");
            
            for (String part : parts) {
                part = part.trim(); 
                
                if (!part.isEmpty()) { // 空要素をスキップ
                    try {
                        long value = Long.parseLong(part);
                        distinctValues.add(value);
                    } catch (NumberFormatException e) {
                        continue; // 整数として解釈できない要素は無視
                    }
                }
            }
        }

        countDistinctValues = distinctValues.size();
        
        BigInteger sumBigInteger = BigInteger.ZERO;
        for (Long value : distinctValues) {
            sumBigInteger = sumBigInteger.add(BigInteger.valueOf(value));
        }
        
        System.out.println("count=" + countDistinctValues + " sum=" + sumBigInteger);
    }
}
