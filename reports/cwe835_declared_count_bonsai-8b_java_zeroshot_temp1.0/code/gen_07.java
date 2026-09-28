import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String firstLine = scanner.nextLine();
        int countStr = firstLine.trim();
        int count = 0;
        try {
            count = Integer.parseInt(countStr);
        } catch (NumberFormatException e) {
            count = 0;
        }

        long sum = 0;
        int lineNum = 2;
        while (lineNum <= 1000) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) continue;
            try {
                int num = Integer.parseInt(line.trim());
                sum += num;
                count++;
            } catch (NumberFormatException e) {
                continue;
            }
            lineNum++;
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
