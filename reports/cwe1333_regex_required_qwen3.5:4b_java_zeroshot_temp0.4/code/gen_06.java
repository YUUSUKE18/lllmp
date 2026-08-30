import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 前後の空白を除去
            String trimmedLine = line.trim();
            
            if (trimmedLine.isEmpty()) {
                continue;
            }
            
            // 正規表現による検証
            // ^: 開始
            // [0-9,]+: 1 個以上の数字またはカンマ（末尾のカンマを含む）
            // $: 終了
            if (trimmedLine.matches("[0-9,]+$")) {
                validCount++;
            } else {
                // 空白が含まれているか、数字とカンマ以外の文字が含まれている場合
                // trim して空でない場合、正規表現が一致しないため here で処理される
                // ただし、空白が含まれている行は trimmedLine が元の行と異なるか、または正規表現で一致しない
                // 仕様: "数字とカンマ以外を含む行は妥当ではありません"
                // 空白は前後は無視だが、内部の空白も許容されない（例: "1, 2" はダメ）
                // 上記の正規表現 [0-9,]+$ は内部の空白を許さないため正しい。
            }
        }
        
        System.out.println("valid=" + validCount);
    }
}
