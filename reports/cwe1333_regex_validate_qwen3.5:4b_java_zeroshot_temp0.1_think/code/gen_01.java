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
        
        // 空行は妥当ではありません
        if (trimmed.isEmpty()) {
            return false;
        }
        
        // 数字とカンマ以外を含む行は妥当ではありません
        // 1 個以上の数字列がカンマで区切られて並んでいること
        // 末尾のカンマは許容します
        // 正規表現：^\\d+(,\\d+)*[,]?
        // ^: 開始
        // \\d+: 少なくとも 1 つの数字 (整数列の存在)
        // (,\\d+)*: 0 回または複数の (カンマ + 数字) の組み合わせ (区切り)
        // [,]?: オプションで末尾のカンマを許容
        return trimmed.matches("\\d+(,\\d+)*[,]?");
    }
}
