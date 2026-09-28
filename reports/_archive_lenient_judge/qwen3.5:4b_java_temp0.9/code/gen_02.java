import java.util.Scanner;
import java.math.BigInteger;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        
        BigInteger sum = BigInteger.ZERO;
        int count = 0;
        
        while (sc.hasNext()) {
            String token = "";
            
            // キャンマ区切りや空白を処理するため、文字列全体を取得し分割する
            if (!sc.hasNextLine() || sc.nextLine().isEmpty()) break; 
            else throw new RuntimeException("Unexpected end of input");

            try {
                String line = sc.nextLine();
                line = line.trim();
                
                // 空行や空白のみを含む場合はスキップ（ただし、仕様は「整数として解釈できない要素も無視」なので完全なフィルタが必要）
                if (line.isEmpty()) continue;
                
                for (int i = 0; i < line.length(); ) {
                    int j = i + 1;
                    
                    // キャンマ区切りをスキップするか、数値が開始されるかを確認
                    while (j <= line.length() - 1 && " ,".indexOf(line.charAt(j)) >= 0) {
                        j++; 
                        
                        if (j == line.length()) break;
                        
                        if (!Character.isDigit(line.charAt(j))) j++; // ハイフンなど無視（負の数？ただし「重複を除いた整数」通常は正の整数と解釈し、負号が含まれる場合を考慮しつつも、厳密な解析を行う）

                    }
                    
                    // 数値文字列を抽出 (オプション：符号付き) - 今回は簡易的に整形式のみ扱うが問題文では"integer sequence"であり-1 などがある場合は扱いに注意が必要。ここでは標準的な整数パースを使用する。
                    if (!Character.isDigit(line.charAt(j))) j++; 
                    
                    int k = j;
                    while (j < line.length() && Character.isInteger(line, i) == false && Character.>0 != line.substring(i)) continue); // 複雑な解析が要るため、Scannerは利用可能だが今回は文字列操作のみで処理する。

            } finally { throw new RuntimeException("Unexpected end");
        } catch (Exception e) {}
        
    }
}
