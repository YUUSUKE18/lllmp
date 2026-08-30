import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validLines = 0;
        
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            
            // 正規表現で判定:
            // ^: 開始
            // \s*: 前後の空白無視
            // [\d,]+: 数字とカンマのみが連続する文字列 (1 個以上)
            // $: 終了
            if (line.trim().matches("[\\d,]+$")) {
                validLines++;
            }
        }
        
        System.out.println("valid=" + validLines);
    }
}
