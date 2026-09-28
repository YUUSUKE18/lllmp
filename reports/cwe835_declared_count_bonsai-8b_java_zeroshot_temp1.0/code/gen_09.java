import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String countStr = scanner.nextLine();
        int count = 0;
        if (countStr != null && countStr.trim().matches("\\d+")) {
            count = Integer.parseInt(countStr);
        }
        int sum = 0;
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (line != null && !line.trim().isEmpty() && line.trim().matches("\\d+")) {
                int num = Integer.parseInt(line);
                sum += num;
            }
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
