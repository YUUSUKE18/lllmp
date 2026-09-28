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
        String trimmed = line.trim();
        if (trimmed.isEmpty()) {
            return false;
        }
        
        // 最初の文字が数字であること
        char first = trimmed.charAt(0);
        if (!(first >= '0' && first <= '9')) {
            return false;
        }

        // 全文字が数字またはカンマのみであること
        for (int i = 1; i < trimmed.length(); i++) {
            char c = trimmed.charAt(i);
            if (c != ',' && !(c >= '0' && c <= '9')) {
                return false;
            }
        }

        // 最初の文字が数字なので、少なくとも 1 つの数字列が存在する
        return true;
    }
}
