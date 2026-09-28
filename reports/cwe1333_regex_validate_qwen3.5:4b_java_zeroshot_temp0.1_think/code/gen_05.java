import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int validCount = 0;
        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            if (isValid(line)) {
                validCount++;
            }
        }
        System.out.println("valid=" + validCount);
    }

    private static boolean isValid(String line) {
        // 行の前後の空白は無視します
        line = line.trim();
        
        // 空行は妥当ではありません
        if (line.isEmpty()) {
            return false;
        }
        
        // 数字とカンマ以外を含む行は妥当ではありません
        for (int i = 0; i < line.length(); i++) {
            char c = line.charAt(i);
            if (!Character.isDigit(c) && c != ',') {
                return false;
            }
        }
        
        // 1 個以上の数字列がカンマで区切られて並んでいること
        // 末尾のカンマは許容します
        
        // 最初の文字が数字でない場合は無効 (例：,1)
        if (!Character.isDigit(line.charAt(0))) {
            return false;
        }
        
        // カンマの直後に数字がない場合（連続したカンマなど）は無効
        for (int i = 0; i < line.length(); i++) {
            if (line.charAt(i) == ',') {
                // 次の文字が存在しない場合は末尾のカンマなので OK
                // 次の文字が存在し、かつ数字でない場合は無効
                if (i + 1 < line.length() && !Character.isDigit(line.charAt(i + 1))) {
                    return false;
                }
            }
        }
        
        return true;
    }
}
