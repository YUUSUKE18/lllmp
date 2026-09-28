import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input = scanner.nextLine();
        List<String> parts = input.split(",");
        int count = 0, total = 0;

        for (String part : parts) {
            part = part.trim();
            if (part.isEmpty()) continue;
            int value;
            int num;
            try {
                String[] tokens = part.split(":");
                if (tokens.length != 2) continue;
                value = Integer.parseInt(tokens[0]);
                num = Integer.parseInt(tokens[1]);
                if (num <= 0) continue;
                count += num;
                total += value * num;
            } catch (NumberFormatException e) {
                continue;
            }
        }

        System.out.println("count=" + count + " sum=" + total);
    }
}
