import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int count = 0;
        long sum = 0;
        
        if (sc.hasNext()) {
            String firstLine = sc.nextLine().trim();
            if (!firstLine.isEmpty() && Integer.parseInt(firstLine) >= 0) {
                count = Integer.parseInt(firstLine);
            }
        }

        while (sc.hasNext()) {
            String line = sc.nextLine().trim();
            if (line.isEmpty()) continue;

            for (String token : line.split("\\s+")) {
                try {
                    long value = Long.parseLong(token);
                    sum += value;
                    count++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない場合は無視
                }
            }
        }

        System.out.println("count=" + count + " sum=" + sum);
    }
}
