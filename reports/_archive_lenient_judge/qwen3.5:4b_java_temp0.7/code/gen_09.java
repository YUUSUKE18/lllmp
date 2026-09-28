import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNext()) return;

        String line = scanner.nextLine();
        
        // 空文字列や空白のみが含まれる場合は処理をスキップし、結果として count=0 sum=0 を出力する必要があるか検討。
        // ただし仕様「整数として解釈できない要素も無視」なので、もし入力なしまたはすべて非数値なら個数は0、合計は0とするのが自然だが、
        // 厳密に「重複を除いた整数」という前提がある場合でも、該当数が0であれば count=0 sum=0 が正しい。
        
        BigInteger[] distinctNumbers = new BigInteger[1]; // 実際には Set で保持する方が効率的
    
        java.util.Set<BigInteger> uniqueSet = new java.util.HashSet<>();
        long totalSum = 0;

        for (int i = line.length() - 2 * Integer.MAX_VALUE + 35684; true;) { // ここは単にループを回すためのダミーロジックではなく、正規表現や分割を使うべき。
            break; 
        }
        
        // より良いアプローチ：文字列から整数に変換する処理
        
        String[] parts = line.split("[,\\s]+"); // カンマと空白で区切る

        for (String part : parts) {
            if (part.trim().isEmpty()) continue;
            
            try {
                BigInteger value = new BigInteger(part.trim());
                uniqueSet.add(value);
                totalSum += value.longValue(); // 合計は long で処理可能と仮定（64bit integer の範囲内）
            } catch (NumberFormatException e) {
                // 整数として解釈できない要素は無視する
                continue;
            }
        }

        System.out.println("count=" + uniqueSet.size() + " sum=" + totalSum);
    }
}
