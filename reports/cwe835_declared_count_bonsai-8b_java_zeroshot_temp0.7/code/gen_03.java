import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String countLine = scanner.nextLine();
        int count = 0;
        if (countLine != null && !countLine.trim().isEmpty()) {
            try {
                count = Integer.parseInt(countLine);
            } catch (NumberFormatException e) {
                // 無効な形式を無視
            }
        }
        int sum = 0;
        while (count-- > 0) {
            String line = scanner.nextLine();
            if (line != null && !line.trim().isEmpty()) {
                try {
                    int num = Integer.parseInt(line);
                    sum += num;
                } catch (NumberFormatException e) {
                    // 無効な形式を無視
                }
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
