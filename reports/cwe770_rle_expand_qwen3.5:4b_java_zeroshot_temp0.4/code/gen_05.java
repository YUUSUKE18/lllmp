import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        long count = 0;
        long sum = 0;
        
        if (scanner.hasNext()) {
            String line = scanner.nextLine();
            // 空行や空白のみを無視するロジックは、問題文の「形に解釈できない要素も無視します」でカバーされるが、
            // シンプルに分割処理を行う。
            String[] parts = line.split(",");
            
            for (String part : parts) {
                part = part.trim();
                if (part.isEmpty()) continue;
                
                // "値:回数" の形式を検出する
                int colonIndex = part.indexOf(':');
                if (colonIndex == -1 || colonIndex == 0) continue; // 無効な形式
                
                String valueStr = part.substring(0, colonIndex).trim();
                String countStr = part.substring(colonIndex + 1).trim();
                
                try {
                    long value = Long.parseLong(valueStr);
                    long repeatCount = Long.parseLong(countStr);
                    
                    if (repeatCount < 0) continue; // 回数は 0 以上
                    
                    for (int i = 0; i < repeatCount; i++) {
                        count++;
                        sum += value;
                    }
                } catch (NumberFormatException e) {
                    // 数値解析エラーが発生した場合は無視する
                }
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
