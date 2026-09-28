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
            
            // 正規表現で判定
            // ^: 開始
            // [0-9,]+: 1 個以上の数字またはカンマの連続
            // $: 終了
            // 末尾のカンマは許容されるため、[0-9,]+ で十分（数字とカンマ以外が含まれていないことを保証）
            if (line.matches("[0-9,]+")) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
