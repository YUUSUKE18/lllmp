import java.util.Scanner;
import java.text.NumberFormat;
import java.math.BigDecimal;
import java.math.RoundingMode;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        int count = 0; // 有効な整数の要素数
        long maxVal = Long.MIN_VALUE;
        boolean hasValue = false;
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            for (int i = 0; i < line.length(); i++) {
                char c = line.charAt(i);
                
                // カンマ区切りであることを考慮して文字を処理するが、Java の Scanner は既に空白分割できる場合もある
                // ただし '64bit integer' と指定されているので Long に収まる整数だけを抽出
                
                if (Character.isWhitespace(c)) {
                    continue; // 空白無視
                } else if ('+' == c || '-' == c) {
                    // 符号付き文字の場合、次の数字を参照する必要がある。単純に解析して後続の要素数をカウントする方が確実だが
                    // シンプルな処理として、全行を読み込むのではなくストリーム上で整数ペアを検出すればよい。
                } else if (Character.isDigit(c)) {
                    continue; 
                } else {
                    // 区切り文字（カンマ）や他の非数値は無視またはスキップするが問題文より「無効な要素も無視」なので OK
                
                    // カンマの場合は次の整数を探す必要がある。簡便のために、文字列全体を再処理して有効な整数を抽出する
                } 
            }
        }
        
        // より堅牢なアプローチ：Scanner は自然に空白と区切り子を認識できるわけではないので手動で解析するか
        Scanner sc = new java.util.Scanner(System.in);
        String inputString = "";
        if (sc.hasNextLine()) {
            inputString = sc.nextLine();
        } else {
            // 入力が空の場合の処理が必要だが、標準入力から来ることを想定し、何もしないで出力する
             System.out.println("count=0 max=" + Long.MIN_VALUE); 
             return;
        }

        // カンマ区切りなので文字列を分割しつつ解析。ただし Java の Scanner はデフォルトでは空白のみ区別しないため手動処理が必要か、または Split 使用で良いが
        long[] numbers = new long[0]; // シンプルに配列作成して数える

        String[] parts = inputString.split(",");
        
        for (int j = 0; j < parts.length; j++) {
            String part = parts[j].trim();
            
            if (part.isEmpty()) continue;
            
            try {
                long val = Long.parseLong(part); // Integer.parseInt は文字数が多すぎると例外が出るため、Long に注意が必要。64bit 整数の範囲内なら大丈夫
                
                numbers[0]++;
                
                hasValue = true;
                if (val > maxVal) {
                    maxVal = val;
                }
            } catch (NumberFormatException e) {
                // 数値ではない場合無視
            }
        }

         System.out.println("count=" + numbers.length - 1); 
         
    } else {
        return;
    }
}
