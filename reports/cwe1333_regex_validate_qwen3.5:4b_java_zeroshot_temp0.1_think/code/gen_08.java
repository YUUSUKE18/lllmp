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
        line = line.trim();
        if (line.isEmpty()) {
            return false;
        }
        // 数字とカンマ以外が含まれていないこと、かつ構造が正しいことを確認
        // ^\d+(,\d+)*(?:,)?$
        // - 少なくとも 1 つの数字列 (\d+) で始まる
        // - カンマで区切られた数字列が続く ((,\d+)*)
        // - 末尾のカンマは許容される ((?:,)?), ただし連続したカンマは許さない (構造上)
        return line.matches("\\d+(,\\d+)*(?:,)?");
    }
}
