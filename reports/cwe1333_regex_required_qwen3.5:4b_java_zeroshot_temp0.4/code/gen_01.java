import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int validCount = 0;
        String regex = "^\\s*(?:\\d+(?:,\\d+)*)?\\s*$"; // 数字列（末尾カンマ含む）または空行の正規表現

        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (line.matches(regex)) {
                validCount++;
            }
        }
        System.out.println("valid=" + validCount);
    }
}
