import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int validLines = 0;
        String line;

        while ((line = br.readLine()) != null) {
            // 行の前後の空白を無視して処理
            String trimmedLine = line.trim();
            
            if (trimmedLine.isEmpty()) {
                // 空行は妥当ではない
                continue;
            }

            // 末尾のカンマを許容し、カンマ区切りの整数列として妥当かを判定
            // 1. 末尾のカンマを除去
            String processedLine = trimmedLine;
            if (processedLine.endsWith(",")) {
                processedLine = processedLine.substring(0, processedLine.length() - 1);
            }
            
            // 2. カンマで分割して、すべてが整数であるか、かつ1つ以上の要素があるかを確認
            String[] parts = processedLine.split(",");
            
            boolean isValid = true;
            for (String part : parts) {
                // 各要素が空でないことを確認（split(",")で空文字列が生成される可能性がある）
                if (part.isEmpty()) {
                    // 末尾のカンマが連続した場合など、不正な区切り方を防ぐため、
                    // 厳密には「数字列がカンマで区切られている」ことを確認する必要がある。
                    // 仕様：「1 個以上の数字列がカンマで区切られて並んでいる」
                    // 空行や数字とカンマ以外のものは不適。
                    // ここでは、splitで得られた各要素が数字のみで構成されているかを確認する。
                    continue; // 単に空要素はスキップし、次の要素をチェック
                }
                
                try {
                    // 数字としてパースできるか試みる
                    Integer.parseInt(part.trim());
                } catch (NumberFormatException e) {
                    // 数字以外の文字が含まれていれば不妥当
                    isValid = false;
                    break;
                }
            }
            
            // 妥当な行のカウント
            if (isValid) {
                validLines++;
            }
        }

        System.out.println("valid=" + validLines);
    }
}
