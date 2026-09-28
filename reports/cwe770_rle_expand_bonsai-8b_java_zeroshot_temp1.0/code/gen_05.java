import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        String[] parts = input.split(",");
        long count = 0, sum = 0;
        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) continue;
            int value;
            try {
                value = Integer.parseInt(part.split(":")[0]);
            } catch (NumberFormatException e) continue;
            int frequency;
            try {
                frequency = Integer.parseInt(part.split(":")[1]);
            } catch (NumberFormatException e) continue;
            if (frequency <= 0) continue;
            count += frequency;
            sum += value * frequency;
        }
        System.out.println("count=" + count + " sum=" + sum);
    }
}
