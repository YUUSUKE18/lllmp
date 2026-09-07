import java.util.HashMap;
import java.util.Map;

public class Main {
    private Map<Integer, Integer> memo = new HashMap<>();

    public static void main(String[] args) {
        Main main = new Main();
        main.run();
    }

    private void run() {
        try {
            int input = readInput();
            while (input != 0) {
                int result = computeSteps(input);
                System.out.println("total=" + result);
                input = readInput();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private int readInput() throws Exception {
        return Integer.parseInt(readLine());
    }

    private String readLine() throws Exception {
        return System.in.readUTF();
    }

    private int computeSteps(int n) {
        if (n == 1) {
            return 0;
        }
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        int steps = 0;
        if (n % 2 == 0) {
            steps = 1 + computeSteps(n / 2);
        } else {
            steps = 1 + computeSteps(3 * n + 1);
        }
        memo.put(n, steps);
        return steps;
    }
}
