import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // 入力文字列を取得
        String inputLine = scanner.nextLine();
        if (inputLine == null || inputLine.trim().isEmpty()) {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
            return;
        }

        // カンマ区切りで分割し、各要素を解析
        Pattern pattern = Pattern.compile("[\\s,]+");
        String[] parts = inputLine.split(pattern);
        
        long count = 0;
        long maxVal = Long.MIN_VALUE;
        boolean hasValue = false;

        for (String part : parts) {
            // カンマや空白が含まれている場合を処理する（split で分割済みだが安全のため）
            if (!part.matches("-?[\\d]+")) continue; 
            
            try {
                long val = Long.parseLong(part);
                
                // 最初の有効な値を設定し、以降の更新を行う
                if (hasValue) {
                    maxVal = Math.max(maxVal, val);
                } else {
                    hasValue = true;
                    maxVal = val;
                }
            } catch (NumberFormatException e) {
                // 整数として解釈できない場合は無視（ただし regex でフィルタリング済み）
            }

        }

        if (!hasValue) {
            System.out.println("count=0 max=" + Long.MIN_VALUE);
        } else {
            System.out.println("count=" + count + " max=" + maxVal);
        }
    }
}
