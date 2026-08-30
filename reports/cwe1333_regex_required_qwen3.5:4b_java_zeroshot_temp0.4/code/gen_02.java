import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 前後の空白を削除
            line = line.trim();
            
            // 空行は妥当ではない
            if (line.isEmpty()) {
                continue;
            }
            
            // 正規表現による判定
            // ^: 開始
            // [0-9,]+: 1 個以上の数字またはカンマ（末尾のカンマも許容）
            // $: 終了
            if (line.matches("[0-9,]+$")) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
