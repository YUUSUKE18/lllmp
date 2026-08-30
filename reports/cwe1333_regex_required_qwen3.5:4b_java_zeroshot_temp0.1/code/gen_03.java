import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 前後の空白を除去
            line = line.trim();
            
            // 空行は妥当ではない
            if (line.isEmpty()) {
                continue;
            }
            
            // 正規表現による判定
            // ^: 開始
            // \s*: 先頭の空白（trim で処理済みだが、念のため）
            // ([0-9]+(,\s*[0-9]+)*)?: 1 個以上の数字列がカンマで区切られて並んでいること (末尾のカンマ許容)
            //   - [0-9]+: 最初の数字列
            //   - (,\s*[0-9]+)*: 以降のカンマと数字列（カンマは必須、数字は必須）
            // \s*: 末尾の空白
            // $: 終了
            if (line.matches("^[\\s]*([0-9]+(,\\s*[0-9]+)*)?[\\s]*$")) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
