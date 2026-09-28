import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextLine()) return;
        String firstLine = scanner.nextLine().trim();
        int n = 0;
        try {
            n = Integer.parseInt(firstLine);
        } catch (NumberFormatException e) {
            n = 0;
        }
        long sum = 0;
        boolean foundAny = false;
        while (scanner.hasNextLine()) {
            String line = scanner.nextLine();
            if (line.isEmpty()) continue;
            int count = 0;
            for (String token : line.split("\\s+")) {
                try {
                    long val = Long.parseLong(token);
                    sum += val;
                    foundAny = true;
                    count++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行またはトークルはスキップ
                }
            }
        }
        System.out.println("count=" + foundAny ? (int) n : "N/A" + " sum=" + sum);
    }
}
