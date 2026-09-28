import java.util.*;

public class Main {
    private static final Map<Integer, Integer> memo = new HashMap<>();
    private static final int MAX = 1000000000; // 64-bit integer range

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<Integer> inputs = new ArrayList<>();

        // Read all integers on one line
        String line = scanner.nextLine().trim();
        if (line.isEmpty()) {
            System.exit(0);
        }

        String[] tokens = line.split("\\s+");
        for (String token : tokens) {
            if (token.matches("\\d+")) {
                inputs.add(Integer.parseInt(token));
            }
        }

        // If no valid integers provided, output 0
        if (inputs.isEmpty()) {
            System.out.println("0");
            return;
        }

        // Compute total steps across all inputs
        int totalSteps = 0;
        for (int n : inputs) {
            if (n == 1) {
                totalSteps += 0;
            } else {
                int steps = 0;
                int current = n;
                while (current != 1) {
                    if (current % 2 == 0) {
                        current = current / 2;
                    } else {
                        current = 3 * current + 1;
                    }
                    steps++;
                }
                totalSteps += steps;
            }
        }

        // Output the result
        System.out.println("total=" + totalSteps);
    }
}
