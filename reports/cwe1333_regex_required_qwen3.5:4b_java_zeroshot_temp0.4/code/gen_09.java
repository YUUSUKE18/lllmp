import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            // 前後の空白を削除し、空行をチェック
            String trimmedLine = line.trim();
            if (trimmedLine.isEmpty()) {
                continue;
            }
            
            // 正規表現で検証:
            // ^ : 開始
            // [\s]* : 内部の余分な空白（許容）
            // (\d+[,]?)? : 1 つ以上の数字列とカンマの組み合わせ (末尾のカンマ含む)
            // ([\s,]+[\d]+)* : 重複する数字列とカンマの組み合わせ
            // [\s]* : 内部の余分な空白（許容）
            // $ : 終了
            // 要約すると: 数字とカンマのみ、末尾のカンマありでも OK。
            if (trimmedLine.matches("[\\s]*(?:\\d+[,]?[\\s]*)*(?:[,][\\s]*\\d+)*$")) {
                validCount++;
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
