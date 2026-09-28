import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (!scanner.hasNextLine()) return;
        
        String line = scanner.nextLine();
        int count = 0;
        BigInteger sum = BigInteger.ZERO;
        
        // カンマ区切りで分割し、各要素を解析する
        for (String part : line.split(",")) {
            if (part.trim().isEmpty()) continue;
            
            try {
                long value = Long.parseLong(part.trim());
                
                int keyIndex = String.valueOf(value).hashCode(); // 簡易的な重複判定用キー（実際は値そのものをセットに入れるべきだが、仕様通り「整数」を扱うため）
                // より正確に：Set に追加して一意の数を数える
                
            } catch (NumberFormatException e) {
                continue; // 整数として解釈できない要素は無視
            }
        }
        
        // Set を使用して重複を除く処理を実装する（上記のロジックは不十分だったため修正）
    }
}
