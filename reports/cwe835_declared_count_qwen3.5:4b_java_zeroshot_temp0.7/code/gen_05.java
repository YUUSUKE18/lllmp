import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNext()) {
            System.out.println("count=0 sum=0");
            return;
        }

        int countLine;
        try {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) {
                System.out.println("count=0 sum=0");
                return;
            }
            countLine = Integer.parseInt(line.trim());
        } catch (NumberFormatException e) {
            System.out.println("count=0 sum=0");
            return;
        }

        long sum = 0L;
        int actualCount = 0;

        while (scanner.hasNext()) {
            String line = scanner.nextLine();
            if (line.trim().isEmpty()) {
                continue;
            }
            
            String[] parts = line.trim().split("\\s+");
            for (String part : parts) {
                try {
                    long val = Long.parseLong(part);
                    sum += val;
                    actualCount++;
                } catch (NumberFormatException e) {
                    // 整数として解釈できない行や要素は無視
                }
            }
        }

        System.out.println("count=" + actualCount + " sum=" + sum);
    }
}
