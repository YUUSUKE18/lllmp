import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        if (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 空白を除去し、カラム区切りで整数分割する
            int count = 0;
            long maxVal = Long.MIN_VALUE;
            boolean hasValue = false;

            for (String part : line.trim().split(",")) {
                part = part.trim();
                if (!part.isEmpty()) {
                    try {
                        // 64bit 整数としてパースし、エラーの場合スキップする（仕様通り：解釈できない要素は無視）
                        long val = Long.parseLong(part);
                        hasValue = true;
                        count++;
                        
                        if (val > maxVal) {
                            maxVal = val;
                        } else if (maxVal == Integer.MIN_VALUE && !hasValue) {
                                // 最初の有効な値が未設定の場合の処理（上記ロジックでは Long.MIN_VALUE が初期化されているので問題ない）
                }
                    } catch (NumberFormatException e) {
                        // 整数として解釈できない要素は無視する
                    }
            }

        else if (!hasValue && count == 0) {
             System.out.println("count=0 max=" + Integer.MIN_VALUE);
             return;
         } 
             
        System.out.println("count=" + count + " max=" + (maxVal == Long.MIN_VALUE ? Integer.MIN_VALUE : maxVal));
    }

}
