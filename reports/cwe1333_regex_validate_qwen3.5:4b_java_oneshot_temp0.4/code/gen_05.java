import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validCount = 0;
        String line;
        
        while ((line = br.readLine()) != null) {
            // 前後の空白を除去（ただし、空行の場合はそのまま）
            String trimmedLine = line.trim();
            
            // 空行は妥当ではない
            if (trimmedLine.isEmpty()) {
                continue;
            }
            
            try {
                // カンマ区切りの整数列として解析する
                // split(",") でカンマで分割し、各要素が整数であるか確認する
                String[] parts = trimmedLine.split(",");
                
                for (String part : parts) {
                    // 部分文字列が空でないことを確認（末尾のカンマを除く場合、最後の要素は空になることがある）
                    if (part.isEmpty()) {
                        continue;
                    }
                    
                    // 整数としてパースできるか確認
                    int num = Integer.parseInt(part);
                }
                
                validCount++;
            } catch (NumberFormatException e) {
                // 数字とカンマ以外が含まれている場合、ここでも処理をスキップ（妥当ではない）
                // ただし、問題文の「数字とカンマ以外を含む行は妥当ではありません」
                // を満たすため、この例外が発生した場合はカウントしない。
            } catch (Exception e) {
                // 分割などのエラーも妥当ではないとみなす
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
