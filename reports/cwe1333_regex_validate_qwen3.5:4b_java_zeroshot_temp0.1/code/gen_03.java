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
            
            // 数字とカンマ以外が含まれているかチェック
            boolean hasInvalidChar = false;
            for (char c : line.toCharArray()) {
                if (!Character.isDigit(c) && c != ',') {
                    hasInvalidChar = true;
                    break;
                }
            }
            
            if (hasInvalidChar) {
                continue;
            }
            
            // カンマ区切りの整数列として妥当か判定
            String[] parts = line.split(",");
            
            // 1 個以上の数字列が並んでいること（空配列は許容せず）
            if (parts.length < 1) {
                continue;
            }
            
            // 各要素が整数であるかチェック
            for (String part : parts) {
                try {
                    Integer.parseInt(part);
                } catch (NumberFormatException e) {
                    // 空白が含まれている場合など、Integer.parseInt が例外をスローする可能性があるが
                    // 前述の「数字とカンマ以外を含む行は妥当ではありません」という条件により、
                    // split("，") で分割された要素には空白が含まれていないはずだが、
                    // 念のためチェックを入れる。ただし、split は末尾の空文字列を生成しないので OK。
                    // ただし、入力に空白が含まれている場合（例："1, 2"）は hasInvalidChar で除外されているため、
                    // ここでは Integer.parseInt が成功するか確認するのみで十分。
                    continue; 
                }
            }
            
            validCount++;
        }
        
        System.out.println("valid=" + validCount);
    }
}
