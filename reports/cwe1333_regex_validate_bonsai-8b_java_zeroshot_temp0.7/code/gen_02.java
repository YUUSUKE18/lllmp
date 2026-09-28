import java.util.Scanner;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        scanner.nextLine(); // consume next line

        // パス：1つのカンマ区切りの整数列
        // - レンダムな空格やタブは無視
        // - 最終的なカンマは許容
        String[] parts = input.trim().split(",");
        if (parts.length >= 1) {
            System.out.println("valid=" + parts.length);
        }
    }
}
