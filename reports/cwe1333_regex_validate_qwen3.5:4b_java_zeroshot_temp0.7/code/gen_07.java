import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            // 前後の空白を切り捨て
            line = line.trim();
            if (line.isEmpty()) {
                continue;
            }

            boolean isMatched = false;
            int index = 0;
            
            // カンマ区切りの整数列が並んでいるか確認するループ
            while (index < line.length()) {
                // 現在の文字が数字かチェック
                if (Character.isDigit(line.charAt(index))) {
                    isMatched = true;
                    int start = index;
                    while (index < line.length() && Character.isDigit(line.charAt(index))) {
                        index++;
                    }
                    
                    // 整数列の後にカンマがあるか、または行が終了するかチェック
                    if (index == line.length()) {
                        break; // 行の終わりに達したが OK
                    }
                    
                    // 次の文字がカンマであることをチェック
                    if (line.charAt(index) == ',') {
                        index++; // カンマをスキップ
                        continue;
                    } else {
                        break; // カンマがない場合、この行は無効
                    }
                } else {
                    break; // 数字ではない文字があるため、無効
                }
            }

            // 少なくとも 1 つの整数列が存在するかチェック
            if (isMatched) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
