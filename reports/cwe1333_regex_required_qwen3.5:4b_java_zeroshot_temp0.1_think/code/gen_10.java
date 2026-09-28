import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int count = 0;
        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            // 行の前後の空白は無視します
            String trimmed = line.trim();
            
            // 空行は妥当ではありません
            if (trimmed.isEmpty()) {
                continue;
            }

            // 正規表現による判定
            // ^[0-9]+ : 数字で始まる
            // (?:,[0-9]+)* : カンマと数字の列が 1 回以上続く（または 0 回）
            // [,]? : 末尾のカンマを許容
            // 空白や文字以外の存在は正規表現の構造により否定される
            if (trimmed.matches("[0-9]+(?:,[0-9]+)*[,]?")) {
                count++;
            }
        }
        System.out.println("valid=" + count);
    }
}
