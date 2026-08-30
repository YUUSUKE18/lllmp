import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 前後の空白を切り取る
            line = line.trim();
            
            // 空行は妥当ではない
            if (line.isEmpty()) {
                continue;
            }
            
            // 数式とカンマ以外が含まれているかチェック
            // validLine 変数は数字のみまたはカンマを含むものかどうかを管理する。
            // ただし、厳密には「数字列」という定義があるため、正しく解析すべき。
            
            if (line.matches("[0-9,]+")) {
                validCount++;
            } else {
                System.out.println("invalid=<valid_count>");
                break; // 妥当でない行に遭遇した時点で終了
            }
        }

        System.out.println("valid=" + validCount);
    }
}
