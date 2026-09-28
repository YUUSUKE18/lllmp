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
        String trimmed = line.trim();
        
        // 空行は妥当ではありません
        if (trimmed.isEmpty()) {
            return false;
        }

        // 数字とカンマ以外を含む行は妥当ではありません
        boolean hasDigit = false;
        for (int i = 0; i < trimmed.length(); i++) {
            char c = trimmed.charAt(i);
            if (!Character.isDigit(c) && c != ',') {
                return false;
            }
            if (Character.isDigit(c)) {
                hasDigit = true;
            }
        }

        // 1 個以上の数字列 -> 少なくとも 1 つの数字が含まれていること
        return hasDigit;
    }
}
