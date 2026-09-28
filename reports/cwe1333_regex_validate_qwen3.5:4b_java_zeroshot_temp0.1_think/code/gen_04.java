import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int count = 0;
        while (sc.hasNextLine()) {
            String line = sc.nextLine();
            if (isValid(line)) {
                count++;
            }
        }
        System.out.println("valid=" + count);
    }

    private static boolean isValid(String line) {
        // 行の前後の空白は無視します
        String trimmed = line.trim();
        // 空行は妥当ではない (trim 後が空文字列の場合)
        // 数字とカンマ以外を含む行は妥当ではない
        // 1 個以上の数字列 -> [0-9]+
        // カンマで区切られて並んでいる -> (,[0-9]+)*
        // 末尾のカンマは許容します -> [,]?
        return trimmed.matches("^[0-9]+(,[0-9]+)*[,]?");
    }
}
