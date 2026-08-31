import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        if (!scanner.hasNextInt()) return;
        
        int count = 0;
        long sum = 0;
        
        while (scanner.hasNextLong()) {
            String line = scanner.nextLine();
            try {
                long value = Long.parseLong(line.trim());
                count++;
                sum += value;
            } catch (NumberFormatException e) {
                // 整数として解釈できない行は無視
            }
        }
        
        System.out.println("count=" + count + " sum=" + sum);
    }
}
